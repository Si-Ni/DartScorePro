const getMostCommonCheckout = require("../helpers/getMostCommonCheckout.helper");

async function mostCommonCheckout(req) {
  const { score } = req.query;
  if (isNaN(score)) return { status: 400 };
  const checkout = await getMostCommonCheckout(score);
  return { status: 200, json: checkout };
}

module.exports = {
  mostCommonCheckout
};