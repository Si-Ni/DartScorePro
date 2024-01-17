const userModel = require("../models/user.model");

const checkUserRegistered = async (userID, userMail) => {
  const isUserRegistered = await userModel
    .findOne({
      $or: [{ userID: userID }, { userMail: userMail }],
    })
    .exec();

  console.log("hier", isUserRegistered);
  return isUserRegistered;
};

module.exports = checkUserRegistered;
