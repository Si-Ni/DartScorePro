const UserStats = require("../models/userStats.model");
const checkUserRegistered = require("./checkUserRegistered.helper");

async function saveUpdatedPlayerStats(thrownPoints, userID) {
  const isUserRegistered = await checkUserRegistered(userID);

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
