const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
        code: "NO_TOKEN",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    // Distinguish "expired" from "invalid" so the frontend knows an
    // expired access token is recoverable by calling /api/admin/refresh,
    // while a malformed/tampered one is not — send straight to login.
    const isExpired = error.name === "TokenExpiredError";

    console.error("Authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: isExpired
        ? "Session expired."
        : "Invalid authentication.",
      code: isExpired ? "TOKEN_EXPIRED" : "TOKEN_INVALID",
    });
  }
};

module.exports = protect;