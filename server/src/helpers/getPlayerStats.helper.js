const UserStats = require("../models/userStats.model");

async function getPlayerStats(userID) {
  try {
    const user = await UserStats.findOne({ userID });
    if (!user) return null;
    return user.stats;
  } catch (error) {
    console.error("Error getting player stats:", error);
    return null;
  }
}

module.exports = getPlayerStats;
