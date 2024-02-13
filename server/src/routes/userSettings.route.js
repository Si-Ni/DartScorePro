const express = require("express");
const verifyToken = require("../middlewares/authenticateToken.middleware");

const router = express.Router();
const {
  changeEmail,
  changeUserPWD,
  changeUserID,
  deleteAccount,
  deleteStats
} = require("../controllers/userSettings.controller");

router
  .post("/changeEmail", verifyToken, changeEmail)
  .post("/changeUsername", verifyToken, changeUserID)
  .post("/changePassword", verifyToken, changeUserPWD)
  .post("/deleteStats", verifyToken, deleteStats)
  .post("/deleteAccount", verifyToken, deleteAccount);

module.exports = router;
