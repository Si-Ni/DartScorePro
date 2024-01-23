const userModel = require("../models/user.model");

const checkUserRegistered = async (userID, userMail) => {
  try {
    const isUserRegistered = await userModel
      .findOne({
        $or: [{ userID: userID }, { userMail: userMail }]
      })
      .exec();

    return isUserRegistered;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = checkUserRegistered;
