const { validationResult } = require("express-validator");

// Middleware to check for client errors
exports.validationMiddleware = (req, res, next) => {
  let errors = validationResult(req);

  // Return an array of errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
