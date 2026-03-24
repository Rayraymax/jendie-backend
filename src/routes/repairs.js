const express = require("express");
const router = express.Router();
const { getLogs, addLog, getAllLogs } = require("../controllers/repairController");

// 🔹 Device-specific repair logs
router.get("/:id/repairs", getLogs);
router.post("/:id/repairs", addLog);

// 🔹 Global repair logs (for reports page)
router.get("/", getAllLogs);

module.exports = router;