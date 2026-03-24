// config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config({ override: true }); // ensure .env values are loaded

// 🔹 If Render provides DATABASE_URL, use it (with SSL)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // allow self-signed certs
        },
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false, // change to console.log to debug queries
      }
    );

// 🔹 Test connection immediately
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = sequelize;