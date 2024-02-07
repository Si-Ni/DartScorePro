const jwt = require("jsonwebtoken");

const generateToken = (userIDorMail, secretKey, expiresIn) => {
  const token = jwt.sign({ userIDorMail }, secretKey, { expiresIn: expiresIn });
  return token;
};

module.exports = generateToken;
