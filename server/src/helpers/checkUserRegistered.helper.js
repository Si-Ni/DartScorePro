const userModel = require("../models/user.model");

const checkUserRegistered = async (userID, userMail) => {
  const isUserRegistered = await userModel
    .findOne({
      userID: userID,
      userMail: userMail,
    })
    .exec();

  return isUserRegistered;
};

module.exports = checkUserRegistered;
