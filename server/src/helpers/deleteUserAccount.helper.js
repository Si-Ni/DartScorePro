const userModel = require("../models/user.model");

const deleteUserAccount = async (userID) => {
  try {
    await userModel.deleteOne({ userID: userID });
    return true;
  } catch (error) {
    console.error("Error in deleting user account:", error);
    return false;
  }
};

module.exports = deleteUserAccount;
