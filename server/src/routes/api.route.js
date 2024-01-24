const express = require("express");
const router = express.Router();
const { mostCommonCheckout } = require("../controllers/api.controller");

router.get("/commonCheckout", mostCommonCheckout);

module.exports = router;
