// src/models/DeviceReturn.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Device = require("./Device");

const DeviceReturn = sequelize.define(
  "DeviceReturn",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "devices",
        key: "id",
      },
    },
    returnedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    returnedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "device_returns",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// 🔹 Associations
Device.hasOne(DeviceReturn, { foreignKey: "deviceId", as: "return" });
DeviceReturn.belongsTo(Device, { foreignKey: "deviceId" });

module.exports = DeviceReturn;