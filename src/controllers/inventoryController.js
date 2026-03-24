const SparePart = require("../models/SparePart");
const { Op } = require("sequelize");


// 🔹 GET ALL PARTS (with search)
exports.getParts = async (req, res) => {
  try {
    const { search } = req.query;

    let where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { partNumber: { [Op.iLike]: `%${search}%` } },
        { category: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const parts = await SparePart.findAll({
      where,
      order: [["created_at", "DESC"]],
    });

    // Add computed status
    const result = parts.map(p => ({
      ...p.toJSON(),
      status: p.quantity <= p.minStock ? "Low Stock" : "In Stock",
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 CREATE PART
exports.createPart = async (req, res) => {
  try {
    const part = await SparePart.create(req.body);
    res.json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 UPDATE PART
exports.updatePart = async (req, res) => {
  try {
    const part = await SparePart.findByPk(req.params.id);

    if (!part) return res.status(404).json({ message: "Part not found" });

    await part.update(req.body);

    res.json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 DELETE PART
exports.deletePart = async (req, res) => {
  try {
    const part = await SparePart.findByPk(req.params.id);

    if (!part) return res.status(404).json({ message: "Part not found" });

    await part.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};