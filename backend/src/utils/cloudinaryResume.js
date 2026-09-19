// services/cloudinaryResume.js
const path = require("path");
const cloudinary = require("../config/cloudinary");

const uploadResume = (file) => {
  return new Promise((resolve, reject) => {
    // Extract extension from the original filename, e.g. "pdf" or "docx"
    const ext = path.extname(file.originalname).replace(".", "").toLowerCase();

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "avtaran-capital/resumes",
        type: "authenticated",

        use_filename: true,
        unique_filename: true,
        overwrite: false,

        // Buffers carry no filename metadata on their own —
        // these two options are what actually preserve the
        // correct name/extension for a raw buffer upload.
        filename_override: file.originalname,
        format: ext,
      },

      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    uploadStream.end(file.buffer);
  });
};

/**
 * Generates a time-limited signed URL for an authenticated raw resource.
 */
const getSignedResumeUrl = (
  publicId,
  format,
  expiresInSeconds = 60 * 5,
) => {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  return cloudinary.utils.private_download_url(publicId, format, {
    resource_type: "raw",
    type: "authenticated",
    expires_at: expiresAt,
  });
};

module.exports = {
  uploadResume,
  getSignedResumeUrl,
};