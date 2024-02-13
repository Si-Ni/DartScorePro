const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userIDRegex = /^[a-zA-Z0-9._-]+$/;
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

async function changeEmail(req) {
  console.log(req.body);
  // const {password, new}

  return { status: 200, json: "changeMail" };
}

async function changeUsername(req) {
  console.log(req.body);
  return { status: 200, json: "changeUsername" };
}

async function changePassword() {
  return { status: 200, json: "changePassword" };
}

async function deleteStats(req) {
  console.log(req.body);
  return { status: 200, json: "deleteStats" };
}

async function deleteAccount(req) {
  console.log(req.body);
  return { status: 200, json: "deleteAccount" };
}

module.exports = {
  changeEmail,
  changeUsername,
  changePassword,
  deleteStats,
  deleteAccount
};
