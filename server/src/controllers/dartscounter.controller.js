const scheduleService = require("../services/auth.service");

async function handleRequest(handler, req, res, next) {
  try {
    const result = await handler(req);
    const { status, json } = result;
    res.status(status).json(json);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
}

module.exports = {
  login: async (req, res, next) => await handleRequest(scheduleService.login, req, res, next),
  register: async (req, res, next) => await handleRequest(scheduleService.register, req, res, next),
};
