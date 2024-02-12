const UserStats = require("../models/userStats.model");
const checkUserRegistered = require("./checkUserRegistered.helper");

async function savePlayerCheckout(lobby) {
  console.log(lobby);
  try {
    for (const player of lobby.players) {
      const { userID } = player;
      const isUserRegistered = await checkUserRegistered(userID);
      if (!isUserRegistered) {
        console.log("User is not registered. Stats cannot be updated or created.");
        continue;
      }

      const isWinner = lobby.game.winner === userID;
      const checkout = lobby.game.playerStats[userID].lastThrows;
      const checkoutValue = lobby.game.playerStats[userID].scoreAtBeginningOfRound;
      const modeOut = lobby.gameSettings.modeOut;

      if (isWinner && checkout) {
        const userStats = await UserStats.findOne({ userID });

        if (!userStats.stats.standard.checkouts) userStats.stats.standard.checkouts = {};

        const existingCheckout =
          userStats.stats.standard.checkouts[checkoutValue] &&
          userStats.stats.standard.checkouts[checkoutValue].find((entry) =>
            entry.checkout.every((item, index) => item === checkout[index])
          );

        if (existingCheckout) {
          const update = {
            $inc: { [`stats.standard.checkouts.${checkoutValue}.$[elem].timesPlayed`]: 1 }
          };
          const options = { arrayFilters: [{ "elem.checkout": { $eq: checkout } }] };
          await UserStats.updateOne({ userID }, update, options);
        } else {
          const update = {
            $push: { [`stats.standard.checkouts.${checkoutValue}`]: { checkout, timesPlayed: 1 } }
          };
          await UserStats.updateOne({ userID }, update);
        }
      }
    }
  } catch (error) {
    console.error("Error saving stats:", error);
  }
}

module.exports = savePlayerCheckout;
