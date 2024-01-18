const { connectDB } = require("./db.service");
const generateRegistrationCode = require("../helpers/generateRegistrationCode.helper");
const sendRegistrationEmail = require("../helpers/sendRegistrationEmail.helper");
const checkUserRegistered = require("../helpers/checkUserRegistered.helper");
const createNewUser = require("../helpers/createNewUser.helper");
const checkUserVerified = require("../helpers/checkUserVerified.helper");
const checkPWDvalid = require("../helpers/checkPwd.helper");

(async () => {
  await connectDB();
})();

async function login(req) {
  let { userIDorMail, userPWD } = req.body;
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userIDRegex = /^[a-zA-Z0-9._-]+$/;

  userIDorMail = userIDorMail.trim();
  userPWD = userPWD.trim();

  const isMail = mailRegex.test(userIDorMail);
  const isUserID = userIDRegex.test(userIDorMail);

  if (!(isMail || isUserID)) {
    return { status: 400, json: "Invalid userID or mail format" };
  }

  const isUserRegistered = await checkUserRegistered(isMail ? null : userIDorMail, isUserID ? null : userIDorMail);

  if (!isUserRegistered) {
    return { status: 400, json: "No user with this name or mail" };
  }

  const isPWDValid = await checkPWDvalid(isMail ? null : userIDorMail, isUserID ? null : userIDorMail, userPWD);

  return isPWDValid ? { status: 200, json: "Login Success" } : { status: 400, json: "Login Failed" };
}

async function register(req) {
  let { userMail, userID, userPWD } = req.body;
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userIDRegex = /^[a-zA-Z0-9._-]+$/;

  if (!userMail || !userID || !userPWD) {
    return { status: 400, json: "Please provide valid values for email, username, and password." };
  }

  userMail = userMail.trim();
  userID = userID.trim();
  userPWD = userPWD.trim();

  if (!mailRegex.test(userMail) || !userIDRegex.test(userID)) {
    return { status: 400, json: "Invalid email or username format" };
  }

  const isUserRegistered = await checkUserRegistered(userID, userMail);

  if (isUserRegistered) {
    return {
      status: 400,
      json: `${
        isUserRegistered.userID === userID ? isUserRegistered.userID : isUserRegistered.userMail
      } already exists`,
    };
  }

  const registerCode = generateRegistrationCode();
  const emailSent = await sendRegistrationEmail(userID, userMail, registerCode);
  await createNewUser(userID, userMail, userPWD, registerCode);

  return emailSent
    ? { status: 200, json: "Registration email sent successfully" }
    : { status: 500, json: "Failed to send registration email" };
}

async function registerVerify(req) {
  let { userMail, registerCode } = req.body;

  userMail = userMail.trim();
  registerCode = registerCode.trim();

  console.log("verify", userMail, registerCode);

  await checkUserVerified(userMail, registerCode);
  return { status: 200, json: "test" };
}

module.exports = {
  login,
  register,
  registerVerify,
};
