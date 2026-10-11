const router = require("express").Router();
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

router.use(encryptResponse);
router.use(protect);

router.get("/profile", getAdminProfile);
router.patch("/password", changeAdminPassword);
router.get("/dashboard", getDashboardStats);

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContact);
router.patch("/contacts/:id/status", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

router.get("/careers", getCareerApplications);
router.get("/careers/:id", getCareerApplication);
router.patch("/careers/:id/status", updateCareerStatus);
router.delete("/careers/:id", deleteCareerApplication);
router.get("/careers/:id/resume", downloadResume);

module.exports = router;
