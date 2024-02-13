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
  changeUserID: async (req, res, next) => await handleRequest(userSettingsService.changeUserID, req, res, next),
  changeUserPWD: async (req, res, next) => await handleRequest(userSettingsService.changeUserPWD, req, res, next),
  deleteStats: async (req, res, next) => await handleRequest(userSettingsService.deleteStats, req, res, next),
  deleteAccount: async (req, res, next) => await handleRequest(userSettingsService.deleteAccount, req, res, next)
};
