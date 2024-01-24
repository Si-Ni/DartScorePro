const mongoose = require("mongoose");

const commonCheckoutModel = new mongoose.Schema({
  score: {
    required: true,
    type: Number,
  },
  checkouts: {
    required: true,
    type: Array,
  },
});

module.exports = mongoose.model("commonCheckout", commonCheckoutModel, "commonCheckouts");
