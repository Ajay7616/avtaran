const cloudinary = require("../config/cloudinary");

const uploadResume = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",

          folder: "avtaran-capital/resumes",

          type: "authenticated",

          use_filename: true,

          unique_filename: true,

          overwrite: false,
        },

        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    uploadStream.end(file.buffer);
  });
};

module.exports = {
  uploadResume,
};