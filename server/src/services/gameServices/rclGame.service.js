const savePlayerWinOrDefeat = require("../../helpers/savePlayerWinOrDefeat.helper");
const {
  switchToNextPlayer,
  updateRemainingThrows,
  updateGameStatsForWinningPlayer,
  resetRoundStatsForNextGame
} = require("../../helpers/game.helper");

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

    savePlayerWinOrDefeat(lobby);
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

module.exports = { updateScoreForCurrentPlayerRcl };
