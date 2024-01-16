const { connectDB } = require("./db.service");
const generateRegistrationCode = require("../helpers/generateRegistrationCode.helper");
const sendRegistrationEmail = require("../helpers/sendRegistrationEmail.helper");
const checkUserRegistered = require("../helpers/checkUserRegistered.helper");
(async () => {
  await connectDB();
})();

async function login() {
  console.log("login");
  return { status: 200, json: "test" };
}

async function register(req) {
  let { userMail, userID, userPWD } = req.body;
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userIDRegex = /^[a-zA-Z0-9._-]+$/;

  if (!userMail || !userID || !userPWD) {
    return {
      status: 400,
      json: "Please provide valid values for email, username, and password.",
    };
  }

  userMail = userMail.trim();
  userID = userID.trim();
  userPWD = userPWD.trim();

  if (!mailRegex.test(userMail))
    return {
      status: 400,
      json: "Invalid email format",
    };
  if (!userIDRegex.test(userID))
    return {
      status: 400,
      json: "Invalid username format",
    };

  const isUserRegistered = await checkUserRegistered(userID, userMail);

  if (isUserRegistered)
    return {
      status: 400,
      json: `${
        isUserRegistered.userID === userID ? isUserRegistered.userID : isUserRegistered.userMail
      } already exists`,
    };

  const registrationCode = generateRegistrationCode();

  const emailSent = await sendRegistrationEmail(req.body, registrationCode);

  if (emailSent) {
    return { status: 200, json: "Registration email sent successfully" };
  } else {
    return { status: 500, json: "Failed to send registration email" };
  }
}

async function registerVerify() {
  console.log("verify");
  return { status: 200, json: "test" };
}

module.exports = {
  login,
  register,
  registerVerify,
};
