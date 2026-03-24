// src/routes/returns.js
const express = require("express");
const router = express.Router();
const { getReturns, confirmReturn } = require("../controllers/returnController");

// 🔹 GET all returned devices
router.get("/", getReturns);

// 🔹 POST confirm return for a device
router.post("/", confirmReturn);

module.exports = router;