const express = require("express");
const verifyToken = require("../middlewares/authenticateToken.middleware");
const router = express.Router();
const { mostCommonCheckout, userStats, allCheckouts } = require("../controllers/api.controller");

router.get("/commonCheckout", mostCommonCheckout);
router.get("/allCheckouts", allCheckouts);
router.get("/userStats", verifyToken, userStats);

module.exports = router;
