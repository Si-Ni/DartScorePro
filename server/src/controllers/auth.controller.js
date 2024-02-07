const authService = require("../services/auth.service");

async function handleRequest(handler, req, res, next) {
  try {
    const result = await handler(req);
    const { status, json } = result;
    json.accessToken &&
      res.cookie("access_token", json.accessToken, { httpOnly: true, expires: new Date(Date.now() + 900000) });
    json.refreshToken &&
      res.cookie("refresh_token", json.refreshToken, { httpOnly: true, expires: new Date(Date.now() + 604800000) });
    res.status(status).json(json);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
}

module.exports = {
  login: async (req, res, next) => await handleRequest(authService.login, req, res, next),
  register: async (req, res, next) => await handleRequest(authService.register, req, res, next),
  registerVerify: async (req, res, next) => await handleRequest(authService.registerVerify, req, res, next),
  generalAuth: async (req, res, next) => await handleRequest(authService.generalAuth, req, res, next)
};
