const { Device } = require("..");
const SparePart = require("../models/SparePart");
const { Op, Sequelize } = require("sequelize");

exports.getStats = async (req, res) => {
  try {

    const totalDevices = await Device.count();

    const received = await Device.count({ where: { status: "Received" } });
    const repairing = await Device.count({ where: { status: "Repairing" } });
    const waitingParts = await Device.count({ where: { status: "Waiting Parts" } });
    const repaired = await Device.count({ where: { status: "Repaired" } });
    const returned = await Device.count({ where: { status: "Returned" } });

    const lowStockParts = await SparePart.count({
      where: {
        quantity: { [Op.lte]: Sequelize.col("minStock") }
      }
    });

    // Avg repair time (in days)
    const avgRepairTime = await Device.findAll({
      attributes: [
        [Sequelize.fn("AVG",
          Sequelize.literal(`DATE_PART('day', "updated_at" - "receivedDate")`)
        ), "avg"]
      ],
      where: { status: "Returned" },
      raw: true
    });

    res.json({
      totalDevices,
      received,
      repairing,
      waitingParts,
      repaired,
      returned,
      lowStockParts,
      avgRepairTime: avgRepairTime[0]?.avg || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};