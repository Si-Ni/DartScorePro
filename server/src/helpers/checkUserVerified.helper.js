const userModel = require("../models/user.model");

const checkUserRegistered = async (userMail, registerCode) => {
  const isUserVerified = await userModel.findOneAndUpdate(
    { userMail: userMail, registerCode: registerCode },
    { $set: { verified: true } },
    { new: true }
  );

  return isUserVerified;
};

module.exports = checkUserRegistered;
