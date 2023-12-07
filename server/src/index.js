require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM users");
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        users: results.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
