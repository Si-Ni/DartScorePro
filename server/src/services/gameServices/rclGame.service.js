const { initialiseForNewRound } = require("./game.service");

const updateScoreForCurrentPlayerRcl = (lobby, args) => {
  const currentPlayerIndex = lobby.game.currentPlayerIndex;
  const currentPlayer = lobby.players[currentPlayerIndex].userID;
  if (args.skip) {
    handlePlayerSkippedTurn(lobby, currentPlayer);
  } else if (args.isHitted) {
    handlePlayerHitTarget(lobby, currentPlayer);
  } else if (!args.isHitted) {
    handlePlayerMissedTarget(lobby, currentPlayer);
  }
};

const handlePlayerSkippedTurn = (lobby, currentPlayer) => {
  addMissesToLastThrows(lobby, currentPlayer);
  switchToNextPlayer(lobby);
};

const addMissesToLastThrows = (lobby, currentPlayer) => {
  const throws = [];
  for (let i = 0; i < lobby.game.throwsRemaining; i++) throws.push("Miss");
  lobby.game.playerStats[currentPlayer].lastThrows = throws;
};

const handlePlayerHitTarget = (lobby, player) => {
  if (checkIfPlayerHasWon(lobby, player)) {
    updateGameStatsForWinningPlayer(lobby, player);
    resetRoundStatsForNextGame(lobby);
  } else {
    increaseTargetByOne(lobby, player);
  }
  updateRemainingThrows(lobby);
};

const checkIfPlayerHasWon = (lobby, player) => {
  const currentPlayerStats = lobby.game.playerStats[player];
  return currentPlayerStats.currentTarget === 20;
};

const increaseTargetByOne = (lobby, player) => {
  addToLastThrows(lobby, player, "Hit");
  const currentPlayerStats = lobby.game.playerStats[player];
  currentPlayerStats.currentTarget++;
};

const handlePlayerMissedTarget = (lobby, player) => {
  addToLastThrows(lobby, player, ["Miss"]);
  updateRemainingThrows(lobby);
};

const addToLastThrows = (lobby, player, lastThrow) => {
  const beginningOfRound = lobby.game.throwsRemaining === 3;
  const currentPlayerStats = lobby.game.playerStats[player];
  currentPlayerStats.lastThrows = beginningOfRound ? [lastThrow] : [...currentPlayerStats.lastThrows, lastThrow];
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
    lobby.game.throwsRemaining = 3;
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

module.exports = { updateScoreForCurrentPlayerRcl };
