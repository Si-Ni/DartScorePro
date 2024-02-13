const userSettingsService = require("../services/userSettings.service");

async function handleRequest(handler, req, res, next) {
  try {
    const { status, json } = await handler(req);

    res.status(status).json(json);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
}

module.exports = {
  changeEmail: async (req, res, next) => await handleRequest(userSettingsService.changeEmail, req, res, next),
  changeUsername: async (req, res, next) => await handleRequest(userSettingsService.changeUsername, req, res, next),
  changePassword: async (req, res, next) => await handleRequest(userSettingsService.changePassword, req, res, next),
  deleteStats: async (req, res, next) => await handleRequest(userSettingsService.deleteStats, req, res, next),
  deleteAccount: async (req, res, next) => await handleRequest(userSettingsService.deleteAccount, req, res, next)
};
