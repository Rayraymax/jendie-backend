// src/models/SparePart.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const SparePart = sequelize.define(
  "SparePart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastRestocked: {
      type: DataTypes.DATEONLY,
      allowNull: true, // optional
    },
  },
  {
    tableName: "spare_parts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = SparePart;