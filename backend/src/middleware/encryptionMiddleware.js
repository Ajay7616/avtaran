const {
  decryptPayload,
  encryptPayload,
} = require("../utils/encryption");

// ==============================
// DECRYPT REQUEST
// ==============================

const decryptRequest = (req, res, next) => {
  try {
    // Only decrypt requests that actually contain a body
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
    ) {
      return next();
    }

    // Normal FormData / multipart requests should NOT
    // go through this middleware.
    if (
      req.headers["content-type"]?.includes(
        "multipart/form-data"
      )
    ) {
      return next();
    }

    // Only decrypt when payload is explicitly encrypted
    if (!req.body.encrypted) {
      return next();
    }

    req.body = decryptPayload(req.body.payload);

    next();
  } catch (error) {
    console.error(
      "Request decryption error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: "Invalid encrypted request.",
    });
  }
};

// ==============================
// ENCRYPT RESPONSE
// ==============================

const encryptResponse = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (data) => {
    try {
      return originalJson({
        encrypted: true,
        payload: encryptPayload(data),
      });
    } catch (error) {
      console.error(
        "Response encryption error:",
        error
      );

      return originalJson({
        success: false,
        message: "Unable to encrypt response.",
      });
    }
  };

  next();
};

module.exports = {
  decryptRequest,
  encryptResponse,
};