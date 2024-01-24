const commonCheckoutModel = require("../models/commonCheckout.model");

const getMostCommonCheckout = async (score) => {
  try {
    const checkoutObject = await commonCheckoutModel
      .findOne({
        score: score,
      })
      .exec();
    return checkoutObject?.checkouts || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = getMostCommonCheckout;
