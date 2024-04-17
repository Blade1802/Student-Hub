require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const cron = require("node-cron");
const db = require("./db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const financeRoutes = require("./routes/finances");
const studentRoutes = require("./routes/students");
const searchRoutes = require("./routes/search");
const appsRoutes = require("./routes/apps");
const announcementsRoutes = require("./routes/announcements");
const { connectDB } = require("./db");

// Passport middleware
require("./middlewares/passport-middleware");

const app = express();

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

connectDB();

// Schedule the cleanup of old tasks daily at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled task cleanup...");
  db.deleteOldTasks();
});

// routes
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/finances", financeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/apps", appsRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
