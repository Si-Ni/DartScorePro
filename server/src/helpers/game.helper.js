const { initialiseForNewRound } = require("./initPlayerStats.helper");

const findPlayerIndexBySocketId = (socketId, players) => {
  const index = players.findIndex((player) => player.socketId === socketId);
  return index;
};

const switchToNextPlayer = (lobby) => {
  const currentGame = lobby.game;
  currentGame.currentPlayerIndex = (currentGame.currentPlayerIndex + 1) % lobby.players.length;
  currentGame.turns++;
  if (lobby.game.turns === lobby.players.length) {
    currentGame.currentRound++;
    currentGame.turns = 0;
  }
  currentGame.throwsRemaining = 3;
};

const updateRemainingThrows = (lobby) => {
  lobby.game.throwsRemaining--;
  if (lobby.game.throwsRemaining === 0) {
    switchToNextPlayer(lobby);
  }
};

const updateGameStatsForWinningPlayer = (lobby, player) => {
  let currentLegs = lobby.game.totalGameStats[player].legs + 1;
  let currentSets = lobby.game.totalGameStats[player].sets;
  if (currentLegs === Number(lobby.gameSettings.legsForSet)) {
    currentSets++;
    currentLegs = 0;
  }

  lobby.game.totalGameStats[player].legs = currentLegs;
  lobby.game.totalGameStats[player].sets = currentSets;

  if (currentSets === Number(lobby.gameSettings.setsToWin)) {
    lobby.game.winner = player;
  }
};

const resetRoundStatsForNextGame = (lobby) => {
  lobby.game.startingPlayerIndex = (lobby.game.startingPlayerIndex + 1) % lobby.players.length;
  initialiseForNewRound(lobby);
};

module.exports = {
  findPlayerIndexBySocketId,
  switchToNextPlayer,
  updateRemainingThrows,
  updateGameStatsForWinningPlayer,
  resetRoundStatsForNextGame
};
