const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const updateUserPWD = async (userID, newUserPWD) => {
  const hashedPWD = await bcrypt.hash(newUserPWD, 10);
  try {
    await userModel.updateOne({ userID: userID }, { $set: { userPWD: hashedPWD } });
    return true;
  } catch (error) {
    console.error("Error in updating password:", error);
    return false;
  }
};

module.exports = updateUserPWD;
