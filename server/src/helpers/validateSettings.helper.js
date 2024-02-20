const validateSettings = (gameSettings) => {
  const isValidGamemode = validateGamemode(gameSettings.selectedGamemode);
  const validSets = isNumeric(gameSettings.setsToWin) && gameSettings.setsToWin > 0;
  const validLegs = isNumeric(gameSettings.legsForSet) && gameSettings.legsForSet > 0;

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

const isNumeric = (value) => {
  return typeof value === "number" || (typeof value === "string" && !isNaN(value) && !isNaN(parseFloat(value)));
};

const validateMode = (mode) => {
  return mode === "straight" || mode === "double";
};

module.exports = validateSettings;
