const UserStats = require("../models/userStats.model");
const checkUserRegistered = require("./checkUserRegistered.helper");

async function savePlayerWinOrDefeat(lobby) {
  // console.log(lobby.game.playerStats.marc.lastThrows)

  try {
    for (const player of lobby.players) {
      const { userID } = player;

      const isUserRegistered = await checkUserRegistered(userID);
      if (!isUserRegistered) {
        console.log("User is not registered. Stats cannot be updated or created.");
        continue;
      }

      const isWinner = lobby.game.winner === userID;
      const gameMode = lobby.gameSettings.selectedGamemode;

      let updateQuery = {};
      if (gameMode === "301" || gameMode === "501") {
        updateQuery = isWinner
          ? { $inc: { "stats.standard.totalWins": 1 } }
          : { $inc: { "stats.standard.totalDefeats": 1 } };
      } else {
        updateQuery = isWinner
          ? { $inc: { [`stats.${gameMode}.totalWins`]: 1 } }
          : { $inc: { [`stats.${gameMode}.totalDefeats`]: 1 } };
      }

      await UserStats.findOneAndUpdate({ userID }, updateQuery);
    }
  } catch (error) {
    console.error("Error saving stats:", error);
  }
}

module.exports = savePlayerWinOrDefeat;
