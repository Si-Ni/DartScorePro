const express = require("express");
const verifyToken = require("../middlewares/authenticateToken.middleware");
const router = express.Router();
const { mostCommonCheckout, userStats } = require("../controllers/api.controller");

router.get("/commonCheckout", mostCommonCheckout);
router.get("/userStats", verifyToken, userStats);

module.exports = router;
