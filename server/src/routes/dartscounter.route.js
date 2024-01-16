const express = require("express");
const router = express.Router();
const { login } = require("../controllers/dartscounter.controller");

router.get("/login", login);

module.exports = router;
