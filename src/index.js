// src/index.js
const express = require("express");
const app = express();
const sequelize = require("../config/db");
const cors = require("cors");

// 🔹 Allow frontend access
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://id-preview--270fdbb4-4638-4113-87a9-814ba7b82b47.lovable.app", // your Lovable URL
  "https://jendie-frontend.onrender.com" // if you deploy frontend later
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
app.use("/api/devices/repairs", repairRoutes); // device-specific repair logs
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/repairs", repairRoutes); // global repair logs

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("✅ Jendie Backend is running!");
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await sequelize.sync({ alter: true });
    console.log("All tables synced");
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();