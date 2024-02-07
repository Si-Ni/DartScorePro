const generateCode = require("../helpers/generateCode.helper");
const sendRegistrationEmail = require("../helpers/sendRegistrationEmail.helper");
const checkUserRegistered = require("../helpers/checkUserRegistered.helper");
const createNewUser = require("../helpers/createNewUser.helper");
const setUserVerified = require("../helpers/setUserVerified.helper");
const checkPWDvalid = require("../helpers/checkPwd.helper");
const generateToken = require("../helpers/generateToken.helper");

const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userIDRegex = /^[a-zA-Z0-9._-]+$/;
let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

async function login(req) {
  let { userIDorMail, userPWD } = req.body;

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

  if (isUserRegistered && !isUserRegistered.verified) {
    return { status: 400, json: "User is registered but not verified" };
  }

  const isPWDValid = await checkPWDvalid(isMail ? null : userIDorMail, isUserID ? null : userIDorMail, userPWD);

  if (isPWDValid) {
    const accessToken = generateToken(isUserRegistered.userID, process.env.ACCESS_TOKEN_SECRET, "15min");
    const refreshToken = generateToken(isUserRegistered.userID, process.env.REFRESH_TOKEN_SECRET, "7d");

    return {
      status: 200,
      json: {
        msg: "Login Success",
        userID: isUserRegistered.userID
      },
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  } else {
    return { status: 400, json: "This password or username is invalid" };
  }
}

async function register(req) {
  let { userMail, userID, userPWD } = req.body;

  if (!userMail || !userID || !userPWD) {
    return { status: 400, json: "Please provide valid values for email, username, and password" };
  }

  userMail = userMail.trim();
  userID = userID.trim();
  userPWD = userPWD.trim();

  if (!mailRegex.test(userMail) || !userIDRegex.test(userID)) {
    return { status: 400, json: "Invalid email or username format" };
  }
  if (!pwdRegex.test(userPWD)) {
    return { status: 400, json: "Please use a strong password" };
  }

  const isUserRegistered = await checkUserRegistered(userID, userMail);

  if (isUserRegistered) {
    return {
      status: 400,
      json: `${isUserRegistered.userID === userID ? isUserRegistered.userID : isUserRegistered.userMail} already exists`
    };
  }

  const registerCode = generateCode();
  const emailSent = await sendRegistrationEmail(userID, userMail, registerCode);
  await createNewUser(userID, userMail, userPWD, registerCode);

  return emailSent
    ? { status: 200, json: "Registration email sent successfully" }
    : { status: 500, json: "Failed to send registration email" };
}

async function logout() {
  return {
    status: 200,
    json: "Logout Success"
  };
}

async function registerVerify(req) {
  let { userMail, registerCode } = req.body;

  userMail = userMail.trim();
  registerCode = registerCode.trim();

  const isUserVerified = await setUserVerified(userMail, registerCode);

  return isUserVerified ? { status: 200, json: "User verified" } : { status: 400, json: "User not verified" };
}

async function generalAuth(req) {
  const { userIDorMail } = req.user;

  const accessToken = generateToken(userIDorMail, process.env.ACCESS_TOKEN_SECRET, "15min");

  return { status: 200, json: { msg: "Authentication successful", userID: userIDorMail }, accessToken: accessToken };
}

module.exports = {
  login,
  register,
  logout,
  registerVerify,
  generalAuth
};
