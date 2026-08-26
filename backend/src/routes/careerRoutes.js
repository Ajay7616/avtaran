const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
  createCareerApplication,
} = require("../controllers/careerController");

const router = express.Router();

router.post(
  "/apply",
  upload.single("resume"),
  createCareerApplication
);

module.exports = router;