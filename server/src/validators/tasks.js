const { body } = require("express-validator");

// Task validation
const createTaskValidation = [
  body("title", "Title is empty").not().isEmpty(),
  body("url", "URL is empty").not().isEmpty(),
];

module.exports = createTaskValidation;
