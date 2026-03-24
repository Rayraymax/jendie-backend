// src/controllers/returnController.js
const { DeviceReturn, Device } = require("..");

// 🔹 GET all returned devices
exports.getReturns = async (req, res) => {
  try {
    const returns = await DeviceReturn.findAll({
      include: [
        {
          model: Device,
          attributes: ["serialNumber", "client", "assignedEngineer", "region", "status"],
        },
      ],
      order: [["returnedDate", "DESC"]],
    });

    res.json(returns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 CONFIRM return
exports.confirmReturn = async (req, res) => {
  try {
    const { deviceId, returnedDate, returnedBy, notes } = req.body;

    const device = await Device.findByPk(deviceId);
    if (!device) return res.status(404).json({ message: "Device not found" });

    // Create return record
    const deviceReturn = await DeviceReturn.create({
      deviceId,
      returnedDate,
      returnedBy,
      notes,
    });

    // Update device status to Returned
    await device.update({ status: "Returned" });

    res.json({ message: "Device returned successfully", deviceReturn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};