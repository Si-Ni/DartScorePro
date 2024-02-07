const mongoose = require("mongoose");

const userStatsModel = new mongoose.Schema({
  stats: {
    totalAverage: {
      required: true,
      type: Number
    },
    totalDartsThrown: {
      required: true,
      type: Number
    },
    totalScore: {
      required: true,
      type: Number
    }
  },
  userID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("userStats", userStatsModel, "userStats");
