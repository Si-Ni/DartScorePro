const { getAllOptions, sumRound } = require("../helpers/getAllCheckouts.helper");

const getMostCommonCheckout = require("../helpers/getMostCommonCheckout.helper");
const getPlayerStats = require("../helpers/getPlayerStats.helper");

async function mostCommonCheckout(req) {
  const { score } = req.query;
  if (isNaN(score)) return { status: 400 };
  const checkout = await getMostCommonCheckout(score);
  return { status: 200, json: checkout };
}

async function allCheckouts(req) {
  const { score } = req.query;
  if (isNaN(score)) return { status: 400 };
  const checkouts = await getAllOptions(3).filter((r) => sumRound(r) === Number(score));
  return { status: 200, json: checkouts };
}

async function userStats(req) {
  const { userIDorMail } = req.user;

  const playerStats = await getPlayerStats(userIDorMail);

  return { status: 200, json: { playerStats: playerStats, userIDorMail: userIDorMail } };
}

module.exports = {
  mostCommonCheckout,
  userStats,
  allCheckouts
};
