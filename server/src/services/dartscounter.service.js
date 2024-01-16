const { connectDB } = require("./db.service");

(async () => {
  await connectDB();
})();

async function login() {
  return { status: 200, json: "test" };
}

module.exports = {
  login,
};
