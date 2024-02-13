const { switchToNextPlayer } = require("../../helpers/game.helper");
const {
  checkIfAnyPlayerHasWonCri,
  checkIfAnyNumberIsClosedByAllPlayers,
  checkIfAnyNumberIsNotClosedByAllPlayers
} = require("./criGame.service");

const checkForWinIfNecessary = async function (lobby) {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "cri") {
    await checkIfAnyPlayerHasWonCri(lobby);
  }
};

const switchPlayerIfNecessary = function (lobby, disconnectedPlayerID) {
  if (lobby.players[lobby.game.currentPlayerIndex].userID === disconnectedPlayerID) {
    switchToNextPlayer(lobby);
  }
};

const handleOnLeave = function (lobby) {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "cri") {
    checkIfAnyNumberIsClosedByAllPlayers(lobby);
  }
};

const handleOnRejoin = function (lobby) {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "cri") {
    checkIfAnyNumberIsNotClosedByAllPlayers(lobby);
  }
};

module.exports = { checkForWinIfNecessary, switchPlayerIfNecessary, handleOnRejoin, handleOnLeave };
