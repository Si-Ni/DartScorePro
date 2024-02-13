const checkPwd = require("../helpers/checkPwd.helper");
const updateUserEmail = require("../helpers/updateUserEmail.helper");
const updateUserID = require("../helpers/updateUserID.helper");
const updateUserPWD = require("../helpers/updateUserPWD.helper");
const checkUserRegistered = require("../helpers/checkUserRegistered.helper");
const deleteUserStats = require("../helpers/deleteUserStats.helper");
const deleteUserAccount = require("../helpers/deleteUserAccount.helper");
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userIDRegex = /^[a-zA-Z0-9._-]+$/;
let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

pwdRegex = /.*/;

async function changeEmail(req) {
  let { userPWD, newUserMail, repeatedNewUserMail } = req.body;

  if (!newUserMail || !userPWD || !repeatedNewUserMail) {
    return { status: 400, json: "Please provide valid values for new email and password" };
  }

  userPWD = userPWD.trim();
  newUserMail = newUserMail.trim();
  repeatedNewUserMail = repeatedNewUserMail.trim();

  if (!mailRegex.test(newUserMail) || !pwdRegex.test(userPWD)) {
    return { status: 400, json: "Invalid email or password format" };
  }

  if (newUserMail !== repeatedNewUserMail) return { status: 400, json: "New email does not match repeated new email" };

  const isUserRegistered = await checkUserRegistered(null, newUserMail);

  if (isUserRegistered) {
    return {
      status: 400,
      json: `${isUserRegistered.userMail} already exists`
    };
  }

  const userID = req.user.userIDorMail;
  const isPWDValid = await checkPwd(userID, null, userPWD);

  if (!isPWDValid) return { status: 400, json: "This password or username is invalid" };

  await updateUserEmail(userID, newUserMail);

  return { status: 200, json: "Email updated successfully" };
}

async function changeUserID(req) {
  let { userPWD, newUserID, repeatedNewUserID } = req.body;

  if (!newUserID || !userPWD || !repeatedNewUserID) {
    return { status: 400, json: "Please provide valid values for new username and password" };
  }

  userPWD = userPWD.trim();
  newUserID = newUserID.trim();
  repeatedNewUserID = repeatedNewUserID.trim();

  if (!userIDRegex.test(newUserID) || !pwdRegex.test(userPWD)) {
    return { status: 400, json: "Invalid username or password format" };
  }

  if (newUserID !== repeatedNewUserID) return { status: 400, json: "New username does not match repeated username" };

  const isUserRegistered = await checkUserRegistered(newUserID, null);

  if (isUserRegistered) {
    return {
      status: 400,
      json: `${isUserRegistered.userID} already exists`
    };
  }

  const userID = req.user.userIDorMail;
  const isPWDValid = await checkPwd(userID, null, userPWD);

  if (!isPWDValid) return { status: 400, json: "This password or username is invalid" };

  await updateUserID(userID, newUserID);

  return { status: 200, json: "Username updated successfully" };
}

async function changeUserPWD(req) {
  let { userPWD, newUserPWD, repeatedNewUserPWD } = req.body;

  if (!newUserPWD || !userPWD || !repeatedNewUserPWD) {
    return { status: 400, json: "Please provide valid values for new password and password" };
  }

  userPWD = userPWD.trim();
  newUserPWD = newUserPWD.trim();
  repeatedNewUserPWD = repeatedNewUserPWD.trim();

  if (!pwdRegex.test(newUserPWD) || !pwdRegex.test(userPWD)) {
    return { status: 400, json: "Invalid new password or password format" };
  }

  if (newUserPWD !== repeatedNewUserPWD) return { status: 400, json: "New password does not match repeated password" };

  if (newUserPWD === userPWD) return { status: 400, json: "New password should not match old password" };

  const userID = req.user.userIDorMail;
  const isPWDValid = await checkPwd(userID, null, userPWD);

  if (!isPWDValid) return { status: 400, json: "This password is invalid" };

  await updateUserPWD(userID, newUserPWD);

  return { status: 200, json: "Password updated successfully" };
}

async function deleteStats(req) {
  let { userPWD, repeatedUserPWD } = req.body;

  if (!userPWD || !repeatedUserPWD) {
    return { status: 400, json: "Please provide valid values for password and repeated password" };
  }

  userPWD = userPWD.trim();
  repeatedUserPWD = repeatedUserPWD.trim();

  if (!pwdRegex.test(repeatedUserPWD) || !pwdRegex.test(userPWD)) {
    return { status: 400, json: "Invalid password format" };
  }
  if (userPWD !== repeatedUserPWD) return { status: 400, json: "Password does not match repeated password" };

  const userID = req.user.userIDorMail;

  const isPWDValid = await checkPwd(userID, null, userPWD);

  if (!isPWDValid) return { status: 400, json: "This password is invalid" };

  await deleteUserStats(userID);

  return { status: 200, json: "Statistics deleted successfully" };
}

async function deleteAccount(req) {
  let { userPWD, repeatedUserPWD } = req.body;

  if (!userPWD || !repeatedUserPWD) {
    return { status: 400, json: "Please provide valid values for password and repeated password" };
  }

  userPWD = userPWD.trim();
  repeatedUserPWD = repeatedUserPWD.trim();

  if (!pwdRegex.test(repeatedUserPWD) || !pwdRegex.test(userPWD)) {
    return { status: 400, json: "Invalid password format" };
  }
  if (userPWD !== repeatedUserPWD) return { status: 400, json: "Password does not match repeated password" };

  const userID = req.user.userIDorMail;

  const isPWDValid = await checkPwd(userID, null, userPWD);

  if (!isPWDValid) return { status: 400, json: "This password is invalid" };

  await deleteUserStats(userID);
  await deleteUserAccount(userID);

  return { status: 200, json: "Account deleted successfully" };
}

module.exports = {
  changeEmail,
  changeUserID,
  changeUserPWD,
  deleteStats,
  deleteAccount
};
