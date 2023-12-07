const db = require("../db");
const { sign } = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM users");
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.user_id,
    email: user.email,
    type: user.user_type,
  };

  try {
    const token = await sign(payload, ACCESS_TOKEN_SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected-info",
    });
  } catch (err) {
    console.error(err);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
