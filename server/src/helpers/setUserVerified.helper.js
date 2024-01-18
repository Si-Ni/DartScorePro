const userModel = require("../models/user.model");

const setUserVerified = async (userIDorMail, registerCode) => {
  const query = { $or: [{ userID: userIDorMail }, { userMail: userIDorMail }], registerCode: registerCode };
  const update = { $set: { verified: true } };

  const isUserVerified = await userModel.findOneAndUpdate(query, update, { new: true });

  return isUserVerified;
};

module.exports = setUserVerified;
