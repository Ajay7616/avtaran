const dotenv = require("dotenv");
dotenv.config();
const validateEnv = require("./config/env");
validateEnv();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ==============================
// DATABASE
// ==============================

connectDB();

// ==============================
// SECURITY
// ==============================

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

// ==============================
// CORS
// ==============================

// const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow Postman/server-to-server requests
//       if (!origin) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },

//     credentials: true,
//   }),
// );

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header:
      // Postman, curl, server-to-server, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS rejected origin:", origin);
      console.error("Allowed origins:", allowedOrigins);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.use(cookieParser());

// ==============================
// BODY PARSING
// ==============================

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);

// ==============================
// GENERAL RATE LIMIT
// ==============================

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 200,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(generalLimiter);

// ==============================
// LOGIN RATE LIMIT
// ==============================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 10,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// ==============================
// HEALTH CHECK
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Avtaran Capital API is running",
  });
});

// ==============================
// ROUTES
// ==============================

app.use("/api/auth", loginLimiter, authRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/careers", careerRoutes);

app.use("/api/admin", adminRoutes);

// ==============================
// 404
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// ==============================
// GLOBAL ERROR HANDLER
// ==============================

app.use((error, req, res, next) => {
  console.error("Global error:", error);

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed.",
    });
  }

  // Multer file errors
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Resume file must be smaller than 5MB.",
    });
  }

  if (error.message === "Only PDF and DOCX files are allowed.") {
    return res.status(400).json({
      success: false,
      message: "Only PDF and DOCX files are allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //console.log(`Server running on http://localhost:${PORT}`);
});
