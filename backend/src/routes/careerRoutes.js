const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const { createCareerApplication } = require("../controllers/careerController");

router.post("/apply", upload.single("resume"), createCareerApplication);

module.exports = router;
