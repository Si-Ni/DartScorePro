const mongoose = require("mongoose");

const userStatsModel = new mongoose.Schema({
  stats: {
    standard: {
      totalAverage: {
        type: Number
      },
      totalDartsThrown: {
        type: Number
      },
      totalScore: {
        type: Number
      },
      totalWins: {
        type: Number
      },
      totalDefeats: {
        type: Number
      }
    },
    cri: {
      totalWins: {
        type: Number
      },
      totalDefeats: {
        type: Number
      }
    },
    rcl: {
      totalDefeats: {
        type: Number
      }
    }
  },
  userID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("userStats", userStatsModel, "userStats");
