const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// ---- config -----------------------------------------------------------
const ACCESS_TOKEN_TTL = "15m";
const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes

const REFRESH_TOKEN_TTL = "7d";
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const isProd = process.env.NODE_ENV === "production";

const baseCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
};

// ---- helpers ------------------------------------------------------------

const signAccessToken = (admin) =>
  jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL },
  );

const signRefreshToken = (admin) =>
  jwt.sign(
    { id: admin._id, tokenVersion: admin.tokenVersion || 0 },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_TTL },
  );

const setAuthCookies = (res, admin) => {
  const accessToken = signAccessToken(admin);
  const refreshToken = signRefreshToken(admin);

  res.cookie("adminToken", accessToken, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  res.cookie("adminRefreshToken", refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie("adminToken", baseCookieOptions);
  res.clearCookie("adminRefreshToken", baseCookieOptions);
};

// ---- controllers --------------------------------------------------------

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    setAuthCookies(res, admin);

    return res.json({
      success: true,
      message: "Login successful.",
      data: {
        admin: { id: admin._id, email: admin.email },
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to login.",
    });
  }
};

/**
 * POST /api/admin/refresh
 * Reads the long-lived refresh cookie, verifies it, checks tokenVersion
 * still matches the DB (so a logout/revocation instantly invalidates it),
 * then issues a fresh short-lived access token (and rotates the refresh
 * token, since rotation is the safer pattern — an old refresh token
 * becomes useless the moment a new one is issued).
 */
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.adminRefreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      clearAuthCookies(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session. Please log in again.",
      });
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin || (admin.tokenVersion || 0) !== decoded.tokenVersion) {
      // Admin deleted, or tokenVersion bumped (logout/revocation) since
      // this refresh token was issued.
      clearAuthCookies(res);
      return res.status(401).json({
        success: false,
        message: "Session no longer valid. Please log in again.",
      });
    }

    // Rotate both tokens.
    setAuthCookies(res, admin);

    return res.json({ success: true, message: "Token refreshed." });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to refresh session.",
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.adminRefreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        // Bump tokenVersion so this (and any other outstanding) refresh
        // token is immediately invalidated, even if it hasn't expired yet.
        await Admin.findByIdAndUpdate(decoded.id, { $inc: { tokenVersion: 1 } });
      } catch (_) {
        // Token already invalid/expired — nothing to revoke.
      }
    }

    clearAuthCookies(res);

    return res.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Admin logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to log out.",
    });
  }
};

module.exports = {
  loginAdmin,
  refreshAccessToken,
  logout,
};