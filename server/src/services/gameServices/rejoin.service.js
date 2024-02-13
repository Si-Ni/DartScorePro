const { checkIfAnyPlayerHasWonCri } = require("./criGame.service");

const checkForWinIfNecessary = async function (lobby) {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "cri") {
    await checkIfAnyPlayerHasWonCri(lobby);
  }
};

module.exports = { checkForWinIfNecessary };
