const express = require("express");

const protect = require("../middleware/authMiddleware");
const { encryptResponse } = require("../middleware/encryptionMiddleware");

const {
  getDashboardStats,

  getAdminProfile,
  changeAdminPassword,

  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,

  getCareerApplications,
  getCareerApplication,
  updateCareerStatus,
  deleteCareerApplication,
  downloadResume,
} = require("../controllers/adminController");

const router = express.Router();

// Everything in this router requires admin login
router.use(protect);

// Encrypts every res.json() call made from this point on, for every
// route below. Doesn't touch res.download()/res.sendFile() — so the
// resume download route stays a normal binary file response, as it
// should, since you can't meaningfully JSON-encrypt a PDF/DOCX stream.
router.use(encryptResponse);

// Contacts
router.get("/contacts", getContacts);

router.get("/contacts/:id", getContact);

router.patch("/contacts/:id/status", updateContactStatus);

router.delete("/contacts/:id", deleteContact);

// Career applications
router.get("/careers", getCareerApplications);

router.get("/careers/:id", getCareerApplication);

router.patch("/careers/:id/status", updateCareerStatus);

router.delete("/careers/:id", deleteCareerApplication);

router.get("/careers/:id/resume", downloadResume);
router.get("/dashboard", getDashboardStats);

router.get("/profile", getAdminProfile);

router.patch("/password", changeAdminPassword);

module.exports = router;