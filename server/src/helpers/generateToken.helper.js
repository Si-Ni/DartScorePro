const jwt = require("jsonwebtoken");

const generateToken = (userIDorMail)  => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign({ userIDorMail }, secretKey, { expiresIn: "1h" });
  return token;
}

module.exports = generateToken;