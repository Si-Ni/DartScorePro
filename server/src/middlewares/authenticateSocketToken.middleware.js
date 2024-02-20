const jwt = require("jsonwebtoken");

function authenticateSocketToken(req, res, next) {
  const isHandshake = req._query.sid === undefined;
  if (!isHandshake) {
    return next();
  }

  const header = req.headers["authorization"];

  if (!header) {
    return next(new Error("Unauthorized: Missing token"));
  }

  if (!header.startsWith("bearer ")) {
    return next(new Error("Unauthorized: Invalid token"));
  }

  const token = header.substring(7);

  jwt.verify(token, process.env.SOCKET_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Unauthorized: Invalid token"));
    }
    req.user = decoded;

    next();
  });
}

module.exports = authenticateSocketToken;
