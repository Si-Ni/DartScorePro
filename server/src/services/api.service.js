const getMostCommonCheckout = require("../helpers/getMostCommonCheckout.helper");
const getPlayerStats = require("../helpers/getPlayerStats.helper");

async function mostCommonCheckout(req) {
  const { score } = req.query;
  if (isNaN(score)) return { status: 400 };
  const checkout = await getMostCommonCheckout(score);
  return { status: 200, json: checkout };
}

async function userStats(req) {
  const { userIDorMail } = req.user;

  const playerStats = await getPlayerStats(userIDorMail);

  console.log(playerStats);

  return { status: 200, json: playerStats };
}

module.exports = {
  mostCommonCheckout,
  userStats
};
