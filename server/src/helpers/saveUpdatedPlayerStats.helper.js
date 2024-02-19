const UserStats = require("../models/userStats.model");
const checkUserRegistered = require("./checkUserRegistered.helper");

async function saveUpdatedPlayerStats(thrownPoints, userID, lobby) {
  const isUserRegistered = await checkUserRegistered(userID);
  const lastThrows = lobby.game.playerStats[userID].lastThrows;

  if (!isUserRegistered) {
    console.log("User is not registered. Stats cannot be updated or created.");
    return;
  }

  try {
    let user = await UserStats.findOne({ userID });
    const totalScore = user ? user.stats.standard.totalScore + thrownPoints : thrownPoints;
    const totalDartsThrown = user ? user.stats.standard.totalDartsThrown + 1 : 1;
    const totalAverage = (totalScore * 3) / totalDartsThrown;

    user = user || new UserStats({ userID, stats: {} });

    const isTripleTwenty = lastThrows.toString() === ["T20", "T20", "T20"].toString();

    if (isTripleTwenty) {
      user.stats.standard["180's"] = (user.stats.standard["180's"] || 0) + 1;
    }

    Object.assign(user.stats.standard, {
      totalAverage: totalAverage,
      totalDartsThrown: totalDartsThrown,
      totalScore: totalScore
    });
    await user.save();
  } catch (error) {
    console.error("Error saving stats:", error);
  }
}

module.exports = saveUpdatedPlayerStats;
