require("dotenv").config();

// Postgres Connection Module
const { Pool } = require("pg");
const pool = new Pool();

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

// Exporting both PostgreSQL and MongoDB functionalities
module.exports = {
  query: (text, params) => pool.query(text, params),
  connectDB,
};
