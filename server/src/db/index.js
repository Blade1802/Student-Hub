require("dotenv").config();

// Postgres Connection Module
const { Pool } = require("pg");
const pool = new Pool();

const closePool = async () => {
  try {
    await pool.end();
    console.log("PostgreSQL pool has been closed.");
  } catch (err) {
    console.error("Failed to close PostgreSQL pool:", err.message);
  }
};

// MongoDB Connection Module
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB connection closed successfully.");
  } catch (err) {
    console.error("Failed to close MongoDB connection:", err.message);
  }
};

// Exporting both PostgreSQL and MongoDB functionalities
module.exports = {
  query: (text, params) => pool.query(text, params),
  closePool,
  connectDB,
  closeDB,
};
