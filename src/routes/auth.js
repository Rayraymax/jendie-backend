// src/routes/auth.js
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// 🔹 Login
router.post("/login", login);

// Future endpoints: logout, register, etc.
// router.post("/logout", logout);
// router.post("/register", register);

module.exports = router;