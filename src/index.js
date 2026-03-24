// src/index.js
const express = require("express");
const app = express();
const sequelize = require("../config/db");
const cors = require("cors");

// 🔹 Allow your frontend to access backend
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://your-lovable-frontend.lovable.app" // replace with your Lovable URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// 🔹 Routes
const authRoutes = require("./routes/auth");
const deviceRoutes = require("./routes/devices");
const repairRoutes = require("./routes/repairs");
const inventoryRoutes = require("./routes/inventory");
const dashboardRoutes = require("./routes/dashboard");
const returnRoutes = require("./routes/returns");

// 🔹 API Prefixes
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/devices", repairRoutes); // device-specific repair logs
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/returns", returnRoutes);  // device returns
app.use("/api/repairs", repairRoutes);  // global repair logs

// 🔹 Start Server
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .then(() => sequelize.sync({ alter: true })) // sync models to DB
  .then(() => console.log("All tables synced"))
  .catch(err => console.error("DB error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));