const router = require("express").Router();
const { loginAdmin, refreshAccessToken, logout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const { encryptResponse } = require("../middleware/encryptionMiddleware");

// Encrypts responses for the whole auth surface — login/me responses
// carry the admin's email and id, so worth covering even though the
// real secret (the JWT) already travels in an httpOnly cookie, not
// the body.
router.use(encryptResponse);

router.post("/login", loginAdmin);
router.post("/refresh", refreshAccessToken); // no `protect` — uses the refresh cookie instead
router.post("/logout", logout);

router.get("/me", protect, (req, res) => {
  res.json({ success: true, data: { admin: req.admin } });
});

module.exports = router;