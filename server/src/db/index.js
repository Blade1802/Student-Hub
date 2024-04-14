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

const deleteOldTasks = async () => {
  const interval = process.env.CLEANUP_INTERVAL || "1 month"; // Default to '1 month' if not specified
  const query = `
    DELETE FROM tasks
    WHERE task_deadline < CURRENT_DATE - INTERVAL '${interval}';
  `;

  try {
    const res = await pool.query(query);
    console.log("Deleted old tasks:", res.rowCount);
  } catch (err) {
    console.error("Error deleting old tasks:", err.message);
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
  deleteOldTasks,
  closePool,
  connectDB,
  closeDB,
};
