const checkPwd = require("../helpers/checkPwd.helper");
const updateUserEmail = require("../helpers/updateUserEmail.helper");
const updateUserID = require("../helpers/updateUserID.helper");
const updateUserPWD = require("../helpers/updateUserPWD.helper");
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userIDRegex = /^[a-zA-Z0-9._-]+$/;
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

async function changeEmail(req) {
  let { userPWD, newUserMail, repeatedNewUserMail } = req.body;

  if (!newUserMail || !userPWD || !repeatedNewUserMail) {
    return { status: 400, json: "Please provide valid values for new email and password" };
  }

  userPWD = userPWD.trim();
  newUserMail = newUserMail.trim();
  repeatedNewUserMail = repeatedNewUserMail.trim();

  console.log(mailRegex.test(newUserMail), pwdRegex.test(userPWD));
  if (!mailRegex.test(newUserMail) || !pwdRegex.test(userPWD)) {
    return { status: 400, json: "Invalid email or password format" };
  }

  if (newUserMail !== repeatedNewUserMail) return { status: 400, json: "New email does not match repeated new email" };

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

  if (newUserPWD !== repeatedNewUserPWD) return { status: 400, json: "New username does not match repeated password" };

  if (newUserPWD === userPWD) return { status: 400, json: "New password should not match old password" };

  const userID = req.user.userIDorMail;
  const isPWDValid = await checkPwd(userID, null, userPWD);

  if (!isPWDValid) return { status: 400, json: "This password is invalid" };

  await updateUserPWD(userID, newUserPWD);

  return { status: 200, json: "Password updated successfully" };
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
  changeUserID,
  changeUserPWD,
  deleteStats,
  deleteAccount
};
