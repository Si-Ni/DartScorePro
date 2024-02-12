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
      },
      checkouts: {
        type: Object // You can adjust this type based on the structure of your checkouts
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
