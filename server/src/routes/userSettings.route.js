const express = require("express");
const router = express.Router();
const {
  changeEmail,
  changePassword,
  changeUsername,
  deleteAccount,
  deleteStats
} = require("../controllers/userSettings.controller");

router
  .post("/changeEmail", changeEmail)
  .post("/changeUsername", changeUsername)
  .post("/changePassword", changePassword)
  .post("/deleteStats", deleteStats)
  .post("/deleteAccount", deleteAccount);

module.exports = router;
