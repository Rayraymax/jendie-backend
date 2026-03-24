// src/controllers/deviceController.js
const { Device, DeviceReturn } = require("../models");
const { Op } = require("sequelize");

// 🔹 GET ALL DEVICES (with search + filters)
exports.getDevices = async (req, res) => {
  try {
    const { search, status } = req.query;

    let where = {};

    if (status) where.status = status;

    if (search) {
      where[Op.or] = [
        { serialNumber: { [Op.iLike]: `%${search}%` } },
        { client: { [Op.iLike]: `%${search}%` } },
        { model: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const devices = await Device.findAll({
      where,
      order: [["created_at", "DESC"]],
    });

    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET SINGLE DEVICE
exports.getDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 CREATE DEVICE (INTAKE)
exports.createDevice = async (req, res) => {
  try {
    const device = await Device.create({
      ...req.body,
      status: "Received", // default on intake
    });

    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 UPDATE DEVICE
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    await device.update(req.body);

    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 MARK DEVICE AS RETURNED
exports.returnDevice = async (req, res) => {
  try {
    const { returnedDate, returnedBy, notes } = req.body;

    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Create return record
    await DeviceReturn.create({
      deviceId: device.id,
      returnedDate,
      returnedBy,
      notes,
    });

    // Update device status
    await device.update({ status: "Returned" });

    res.json({ message: "Device returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};