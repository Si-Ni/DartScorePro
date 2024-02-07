const { initialiseForNewRound } = require("./game.service");

const updateScoreForCurrentPlayerStandardGames = (lobby, { multiplier, points }) => {
  const currentPlayerIndex = lobby.game.currentPlayerIndex;
  const currentPlayer = lobby.players[currentPlayerIndex].userID;

  if (shouldSetPointsToZero(lobby, currentPlayer, multiplier)) points = 0;

  const beginningOfRound = lobby.game.throwsRemaining === 3;
  if (beginningOfRound) {
    saveBeginningScore(lobby, currentPlayer);
    clearLastThrowsOfPlayer(lobby, currentPlayer);
  }

  addThrowToLastThrows(lobby, currentPlayer, points, multiplier);

  updateScoreForPlayerAndContinueGame(lobby, currentPlayer, points, multiplier);
};

const shouldSetPointsToZero = (lobby, currentPlayer, multiplier) => {
  const playerStats = lobby.game.playerStats;
  const violatesDoubleInMode =
    playerStats[currentPlayer].score === lobby.game.gamemodeTotalScore &&
    lobby.gameSettings.modeIn === "double" &&
    (multiplier === 1 || multiplier === 3);
  return violatesDoubleInMode;
};

const saveBeginningScore = (lobby, currentPlayer) => {
  const currentPlayerStats = lobby.game.playerStats[currentPlayer];
  currentPlayerStats.scoreAtBeginningOfRound = currentPlayerStats.score;
};

const clearLastThrowsOfPlayer = (lobby, currentPlayer) => {
  lobby.game.playerStats[currentPlayer].lastThrows = [];
};

const formatThrowToString = (points, multiplier) =>
  multiplier === 2 && points === 25 ? "BULL" : `${multiplier > 1 ? ["D", "T"][multiplier - 2] : ""}${points}`;

const addThrowToLastThrows = (lobby, currentPlayer, points, multiplier) => {
  const formattedThrow = formatThrowToString(points, multiplier);
  lobby.game.playerStats[currentPlayer].lastThrows.push(formattedThrow);
};

const updateScoreForPlayerAndContinueGame = (lobby, currentPlayer, points, multiplier) => {
  const thrownPoints = points * multiplier;
  const updatedScore = calculateUpdatedScore(lobby, currentPlayer, thrownPoints);

  const updatedScoreIsInvalid =
    updatedScore < 0 ||
    (lobby.gameSettings.modeOut === "double" && (updatedScore === 1 || (multiplier === 1 && updatedScore === 0)));

  if (updatedScoreIsInvalid) {
    resetScoreToBeginningOfRound(lobby, currentPlayer);
    switchToNextPlayer(lobby);
  } else {
    updatePlayerStatsByThrownPoints(lobby, currentPlayer, thrownPoints);
    updateRemainingThrows(lobby);
    checkIfPlayerHasWon(lobby, currentPlayer, updatedScore, multiplier);
  }
};

const calculateUpdatedScore = (lobby, currentPlayer, thrownPoints) => {
  const currentPlayerScore = lobby.game.playerStats[currentPlayer].score;
  const updatedScore = currentPlayerScore - thrownPoints;
  return updatedScore;
};

const resetScoreToBeginningOfRound = (lobby, currentPlayer) => {
  const currentPlayerStats = lobby.game.playerStats[currentPlayer];
  currentPlayerStats.score = currentPlayerStats.scoreAtBeginningOfRound;
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

const updatePlayerStatsByThrownPoints = (lobby, player, thrownPoints) => {
  let currentPlayerStats = lobby.game.playerStats[player];
  currentPlayerStats = {
    ...currentPlayerStats,
    score: currentPlayerStats.score - thrownPoints,
    totalScore: currentPlayerStats.totalScore + thrownPoints,
    dartsThrown: currentPlayerStats.dartsThrown + 1,
    turns: lobby.game.throwsRemaining === 1 ? currentPlayerStats.turns + 1 : currentPlayerStats.turns,
    average: ((currentPlayerStats.totalScore + thrownPoints) * 3) / (currentPlayerStats.dartsThrown + 1)
    //ToDo: checkoutOptions: getAllOptions(3).filter((r) => sumRound(r) === currentPlayerStats.score - thrownPoints)
  };
  lobby.game.playerStats[player] = currentPlayerStats;
};

const updateRemainingThrows = (lobby) => {
  lobby.game.throwsRemaining--;
  if (lobby.game.throwsRemaining === 0) {
    switchToNextPlayer(lobby);
    lobby.game.throwsRemaining = 3;
  }
};

const checkIfPlayerHasWon = (lobby, player, updatedScore, multiplier) => {
  const playerWon = updatedScore === 0 && (lobby.gameSettings.modeOut !== "double" || multiplier === 2);
  if (playerWon) {
    updateGameStatsForWinningPlayer(lobby, player);
    resetRoundStatsForNextGame(lobby);
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

module.exports = { updateScoreForCurrentPlayerStandardGames };
