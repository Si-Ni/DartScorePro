const userStats = require("../models/userStats.model");

const deleteUserStats = async (userID) => {
  try {
    await userStats.deleteOne({ userID: userID });
    return true;
  } catch (error) {
    console.error("Error in deleting user stats:", error);
    return false;
  }
};

module.exports = deleteUserStats;
