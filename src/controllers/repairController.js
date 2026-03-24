// src/controllers/repairController.js
const { RepairLog, Device } = require("../models");

// 🔹 Get logs for a specific device
exports.getLogs = async (req, res) => {
  try {
    const logs = await RepairLog.findAll({
      where: { deviceId: req.params.id },
      order: [["created_at", "DESC"]],
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Add repair log for a device
exports.addLog = async (req, res) => {
  try {
    const { markAsRepaired, ...data } = req.body;

    const log = await RepairLog.create({
      ...data,
      deviceId: req.params.id,
    });

    // ✅ If marked as repaired, update device status
    if (markAsRepaired) {
      await Device.update(
        { status: "Repaired" },
        { where: { id: req.params.id } }
      );
    }

    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get all repair logs (for reports page)
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await RepairLog.findAll({
      include: [
        {
          model: Device,
          attributes: ["id", "serialNumber", "client", "model", "status"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};