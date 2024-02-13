const userModel = require("../models/user.model");

const updateUserID = async (userID, newUserID) => {
  try {
    await userModel.updateOne({ userID: userID }, { $set: { userID: newUserID } });
    return true;
  } catch (error) {
    console.error("Error in updating username:", error);
    return false;
  }
};

module.exports = updateUserID;
