const requiredEnv = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "API_ENCRYPTION_KEY",
  "ADMIN_EMAIL",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "CLIENT_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const validateEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("Missing environment variables:");
    missing.forEach((key) => {
      console.error(`- ${key}`);
    });
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.warn("WARNING: JWT_SECRET should be at least 32 characters long.");
  }

  if (process.env.JWT_REFRESH_SECRET.length < 32) {
    console.warn("WARNING: JWT_REFRESH_SECRET should be at least 32 characters long.");
  }

  if (process.env.JWT_SECRET === process.env.JWT_REFRESH_SECRET) {
    console.warn("WARNING: JWT_SECRET and JWT_REFRESH_SECRET should be different values.");
  }
};

module.exports = validateEnv;