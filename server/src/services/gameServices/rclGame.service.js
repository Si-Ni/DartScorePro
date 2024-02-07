const { initialiseForNewRound } = require("./game.service");

const updateScoreForCurrentPlayerRcl = (lobby, args) => {
  const currentPlayerIndex = lobby.game.currentPlayerIndex;
  const currentPlayer = lobby.players[currentPlayerIndex].userID;
  if (args.skip) {
    handlePlayerSkippedTurn(lobby, currentPlayer);
  } else if (args.isHitted) {
    handlePlayerHitTarget(lobby);
  } else if (!args.isHitted) {
    handlePlayerMissedTarget(lobby);
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

const handlePlayerHitTarget = (lobby) => {};

module.exports = { updateScoreForCurrentPlayerRcl };
