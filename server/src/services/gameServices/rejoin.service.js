const { switchToNextPlayer } = require("../../helpers/game.helper");
const { checkIfAnyPlayerHasWonCri } = require("./criGame.service");

const checkForWinIfNecessary = async function (lobby) {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "cri") {
    await checkIfAnyPlayerHasWonCri(lobby);
  }
};

const switchPlayerIfNecessary = function (lobby, disconnectedPlayerID) {
  if (lobby.players[lobby.game.currenPlayerIndex].userID === disconnectedPlayerID) {
    switchToNextPlayer(lobby);
  }
};

module.exports = { checkForWinIfNecessary, switchPlayerIfNecessary };
