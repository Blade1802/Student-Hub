const { check } = require("express-validator");
const db = require("../db");

// Login validation
const loginValidation = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * from users WHERE user_email = $1", [
    value,
  ]);

  // If no user found
  if (!user.rowCount) {
    throw new Error("Email is incorrect.");
  }

  // Validate password if email exists
  const validPassword = req.body.password == user.rows[0].user_password;

  // If password is incorrect
  if (!validPassword) {
    throw new Error("Password is incorrect.");
  }

  req.user = user.rows[0];
});

module.exports = loginValidation;
