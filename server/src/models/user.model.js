const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userID: {
    required: true,
    type: String,
  },
  pwd: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", userModel, "users");
