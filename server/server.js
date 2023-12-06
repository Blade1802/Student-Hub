require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Welcome to the Student Hub");
  res.status(200).json({
    status: "success",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
