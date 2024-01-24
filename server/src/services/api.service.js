const getMostCommonCheckout = require("../helpers/getMostCommonCheckout.helper");

async function mostCommonCheckout(req) {
  const { score } = req.query;
  const checkout = await getMostCommonCheckout(score);
  console.log(checkout);
  return { status: 200, json: checkout };
}

module.exports = {
  mostCommonCheckout,
};
