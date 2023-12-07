require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./db");
const authRoutes = require("./routes/auth");

// Passport middleware
require("./middlewares/passport-middleware");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// routes
app.use("/api", authRoutes);

app.get("/", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM users where user_id = 3");
    const user = results.rows[0];
    console.log(user);
    res.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        users: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
