require("dotenv").config();
const { exec } = require("child_process");
const mongoose = require("mongoose");
const Student = require("../models/student");
const students = require("../fixtures/students");

// Reset PostgreSQL Database
const resetPostgresDB = () => {
  const databaseName = process.env.PGDATABASE || "student_hub_v1";
  const databaseUser = process.env.PGUSER || "postgres";
  const resetScriptPath = "./src/scripts/reset_db.sql";

  const command = `psql -d ${databaseName} -U ${databaseUser} -f ${resetScriptPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`Postgres DB Reset stdout: ${stdout}`);
    if (stderr) console.error(`Postgres DB Reset stderr: ${stderr}`);

    // After resetting PostgreSQL, proceed to reset MongoDB
    resetMongoDB();
  });
};

// Reset MongoDB Database and Seed Data
const resetMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.");

    // Drop the MongoDB database
    await mongoose.connection.db.dropDatabase();
    console.log("MongoDB Database has been dropped.");

    await Student.insertMany(students);
    console.log("MongoDB Dummy data has been inserted.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    // Close the Mongoose connection
    mongoose.connection.close();
  }
};

// Start the reset process with PostgreSQL
resetPostgresDB();
