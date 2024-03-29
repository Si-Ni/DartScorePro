const {
  switchToNextPlayer,
  updateRemainingThrows,
  updateGameStatsForWinningPlayer
} = require("../../helpers/game.helper");

const updateScoreForCurrentPlayerRcl = async (lobby, args) => {
  const currentPlayerIndex = lobby.game.currentPlayerIndex;
  const currentPlayer = lobby.players[currentPlayerIndex].userID;
  if (args.skip) {
    handlePlayerSkippedTurn(lobby, currentPlayer);
  } else if (args.isHitted) {
    await handlePlayerHitTarget(lobby, currentPlayer);
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

const handlePlayerHitTarget = async (lobby, player) => {
  if (checkIfPlayerHasWon(lobby, player)) {
    await handlePlayerWon(lobby, player);
  } else {
    increaseTargetByOne(lobby, player);
  }
  updateRemainingThrows(lobby);
};

const checkIfPlayerHasWon = (lobby, player) => {
  const currentPlayerStats = lobby.game.playerStats[player];
  return currentPlayerStats.currentTarget === 20;
};

const handlePlayerWon = async (lobby, player) => {
  await updateGameStatsForWinningPlayer(lobby, player);
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
