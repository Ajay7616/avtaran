const requiredEnv = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "CLIENT_URL",
];

const validateEnv = () => {
  const missing = requiredEnv.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    console.error(
      "Missing environment variables:"
    );

    missing.forEach((key) => {
      console.error(`- ${key}`);
    });

    process.exit(1);
  }
};

module.exports = validateEnv;