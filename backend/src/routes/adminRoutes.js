const express = require("express");

const protect = require("../middleware/authMiddleware");

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
