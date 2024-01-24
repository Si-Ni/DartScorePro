const apiService = require("../services/api.service");

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
  mostCommonCheckout: async (req, res, next) => await handleRequest(apiService.mostCommonCheckout, req, res, next),
};
