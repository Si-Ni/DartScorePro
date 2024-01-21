const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 600000,
  max: 60,
  message: "You have exceeded the 60 requests in 10 min limit!",
  standardHeaders: true,
  legacyHeaders: false,
  skip: function (req) {
    return !((req.path === "/register/" && req.method === "POST") || (req.path === "/login/" && req.method === "POST"));
  }
});

module.exports = rateLimiterUsingThirdParty;
