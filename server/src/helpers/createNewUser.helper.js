const bcrypt = require("bcrypt");

const createNewUser = async (userID, userMail, userPWD, registerCode) => {
  try {
    const hashedPWD = await bcrypt.hash(userPWD, 10);

    const userModel = require("../models/user.model");
    const newUser = new userModel({
      userID: userID,
      userMail: userMail,
      userPWD: hashedPWD,
      verified: false,
      registerCode: registerCode
    });

    await newUser.save();

  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = createNewUser;
