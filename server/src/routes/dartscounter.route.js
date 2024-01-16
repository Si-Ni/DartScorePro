const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/dartscounter.controller");

router.post("/login", login).post("/register", register);

module.exports = router;
