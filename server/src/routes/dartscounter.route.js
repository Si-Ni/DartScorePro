const express = require("express");
const router = express.Router();
const { login, register, registerVerify } = require("../controllers/dartscounter.controller");

router.post("/login", login).post("/register", register).post("/register/verify", registerVerify);

module.exports = router;
