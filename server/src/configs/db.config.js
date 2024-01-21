const dotenv = require("dotenv");

dotenv.config();

const db = {
  uri: process.env.DB_URI
};
module.exports = db;
