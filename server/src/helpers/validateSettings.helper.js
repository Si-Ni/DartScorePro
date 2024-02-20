const validateSettings = (gameSettings) => {
  const isValidGamemode = validateGamemode(gameSettings.selectedGamemode);
  const validSets = isNumber(gameSettings.setsToWin) && gameSettings.setsToWin > 0;
  const validLegs = isNumber(gameSettings.legsForSet) && gameSettings.legsForSet > 0;

  if (gameSettings.selectedGamemode === "301" || gameSettings.selectedGamemode === "501") {
    const validModeIn = validateMode(gameSettings.modeIn);
    const validModeOut = validateMode(gameSettings.modeOut);
    return isValidGamemode && validSets && validLegs && validModeIn && validModeOut;
  }

  return isValidGamemode && validSets && validLegs;
};

const validateGamemode = (gamemode) => {
  const validGamemodes = ["301", "501", "rcl", "cri"];
  return validGamemodes.includes(gamemode);
};

const isNumber = (value) => {
  return typeof value === "number";
};

const validateMode = (mode) => {
  return mode === "straight" || mode === "double";
};

module.exports = validateSettings;
