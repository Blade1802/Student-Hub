require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const studentRoutes = require("./routes/students");
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

// routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", studentRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
