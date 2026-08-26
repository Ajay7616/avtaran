const express = require("express");

const { loginAdmin, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logout);

module.exports = router;
