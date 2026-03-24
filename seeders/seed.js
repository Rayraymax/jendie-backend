// seeders/seed.js
const sequelize = require("../config/db");
const User = require("../src/models/User");
const bcrypt = require("bcrypt");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@test.com",
      role: "admin",
      password: hash,
    });

    console.log("User created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();