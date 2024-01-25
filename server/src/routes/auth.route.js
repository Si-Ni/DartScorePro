const express = require("express");
const router = express.Router();
const { login, register, registerVerify, generalAuth } = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/authenticateToken.middleware");

router
  .post("/login", login)
  .post("/register", register)
  .post("/register/verify", registerVerify)
  .get("/generalAuth/", verifyToken, generalAuth);

module.exports = router;
