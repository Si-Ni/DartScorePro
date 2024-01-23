const userModel = require("../models/user.model");

const setUserVerified = async (userIDorMail, registerCode) => {
  try {
    const isUserVerified = await userModel.findOneAndUpdate(
      {
        $or: [{ userID: userIDorMail }, { userMail: userIDorMail }],
        registerCode: registerCode
      },
      { $set: { verified: true } },
      { new: true }
    );

    return isUserVerified;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = setUserVerified;
