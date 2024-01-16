const createNewUser = async (userID, userMail, userPWD) => {
  const userModel = require("../models/user.model");
  const newUser = new userModel({
    userID: userID,
    userMail: userMail,
    userPWD: userPWD,
  });
  await newUser.save();
};

module.exports = createNewUser;
