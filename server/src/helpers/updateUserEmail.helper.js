const userModel = require("../models/user.model");

const updateUserEmail = async (userID, newUserMail, registerCode) => {
  try {
    await userModel.updateOne(
      { userID: userID },
      { $set: { userMail: newUserMail, verified: false, registerCode: registerCode } }
    );
    return true;
  } catch (error) {
    console.error("Error in updating email:", error);
    return false;
  }
};

module.exports = updateUserEmail;
