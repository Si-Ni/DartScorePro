const userModel = require("../models/user.model");

const updateUserEmail = async (userID, newUserMail) => {
  try {
    await userModel.updateOne({ userID: userID }, { $set: { userMail: newUserMail } });
    return true;
  } catch (error) {
    console.error("Error in updating email:", error);
    return false;
  }
};

module.exports = updateUserEmail;
