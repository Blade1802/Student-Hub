// Module to export environment variables
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
