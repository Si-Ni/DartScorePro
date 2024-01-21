const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userID: {
    required: true,
    type: String
  },
  userMail: {
    required: true,
    type: String
  },
  userPWD: {
    required: true,
    type: String
  },
  verified: {
    required: true,
    type: Boolean
  },
  registerCode: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model("user", userModel, "users");
