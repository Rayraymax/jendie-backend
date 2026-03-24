// src/models/RepairLog.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Device = require("./Device");

const RepairLog = sequelize.define(
  "RepairLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "devices",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    engineer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    firmwareVersion: {
      type: DataTypes.STRING,
    },
    firmwareStatus: {
      type: DataTypes.ENUM("Success", "Failed"),
    },
    transmissionDescription: {
      type: DataTypes.TEXT,
    },
    transmissionResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    messagingDescription: {
      type: DataTypes.TEXT,
    },
    messagingResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "repair_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// 🔹 Associations
Device.hasMany(RepairLog, { foreignKey: "deviceId", as: "repairLogs" });
RepairLog.belongsTo(Device, { foreignKey: "deviceId" });

module.exports = RepairLog;