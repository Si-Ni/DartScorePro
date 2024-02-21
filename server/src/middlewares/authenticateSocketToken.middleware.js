const jwt = require("jsonwebtoken");

function authenticateSocketToken(req, res, next) {
  const isHandshake = req._query.sid === undefined;
  const cookies = req.headers.cookie;
  if (!isHandshake || !cookies) {
    return next(new Error("Unauthorized: Missing token"));
  }
  const socketTokenStartIndex = cookies.indexOf("socket_token=");
  if (socketTokenStartIndex === -1) {
    return next(new Error("Unauthorized: Missing token"));
  }
  const socketTokenEndIndex = cookies.indexOf(";", socketTokenStartIndex);

  let token = cookies.substring(
    socketTokenStartIndex + "socket_token=".length,
    socketTokenEndIndex !== -1 ? socketTokenEndIndex : cookies.length
  );

  jwt.verify(token, process.env.SOCKET_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Unauthorized: Invalid token"));
    }
    req.user = decoded;

    next();
  });
}

module.exports = authenticateSocketToken;
