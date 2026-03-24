const express = require("express");
const router = express.Router();

const {
  getDevices,
  getDevice,
  createDevice,
  updateDevice
} = require("../controllers/deviceController");

// 🔹 Get all devices (with search & filter)
router.get("/", getDevices);

// 🔹 Get single device
router.get("/:id", getDevice);

// 🔹 Create device (intake)
router.post("/", createDevice);

// 🔹 Update device (status, fields)
router.put("/:id", updateDevice);

module.exports = router;