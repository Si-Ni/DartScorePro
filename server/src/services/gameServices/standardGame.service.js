const saveUpdatedPlayerStats = require("../../helpers/saveUpdatedPlayerStats.helper");
const savePlayerWinOrDefeat = require("../../helpers/savePlayerWinOrDefeat.helper");
const savePlayerCheckout = require("../../helpers/savePlayerCheckout.helper");
const {
  switchToNextPlayer,
  updateRemainingThrows,
  updateGameStatsForWinningPlayer
} = require("../../helpers/game.helper");

const updateScoreForCurrentPlayerStandardGames = async (lobby, { multiplier, points }) => {
  if (!validatePoints) return;

  const currentPlayerIndex = lobby.game.currentPlayerIndex;
  const currentPlayer = lobby.players[currentPlayerIndex].userID;

  if (shouldSetPointsToZero(lobby, currentPlayer, multiplier)) points = 0;

  const beginningOfRound = lobby.game.throwsRemaining === 3;
  if (beginningOfRound) {
    saveBeginningScore(lobby, currentPlayer);
    clearLastThrowsOfPlayer(lobby, currentPlayer);
  }

  addThrowToLastThrows(lobby, currentPlayer, points, multiplier);

  await updateScoreForPlayerAndContinueGame(lobby, currentPlayer, points, multiplier);
};

const validatePoints = (points) => {
  return [0, ...Array.from({ length: 21 }, (_, i) => i + 1), 25].includes(points);
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

const updateScoreForPlayerAndContinueGame = async (lobby, currentPlayer, points, multiplier) => {
  const thrownPoints = points * multiplier;
  const updatedScore = calculateUpdatedScore(lobby, currentPlayer, thrownPoints);

  const updatedScoreIsInvalid =
    updatedScore < 0 ||
    (lobby.gameSettings.modeOut === "double" && (multiplier === 1 || multiplier === 3) && updatedScore <= 1) ||
    (multiplier === 2 && updatedScore === 1);

  if (updatedScoreIsInvalid) {
    resetScoreToBeginningOfRound(lobby, currentPlayer);
    switchToNextPlayer(lobby);
  } else {
    updatePlayerStatsByThrownPoints(lobby, currentPlayer, thrownPoints);
    updateRemainingThrows(lobby);
    await checkIfPlayerHasWon(lobby, currentPlayer, updatedScore, multiplier);
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

const updatePlayerStatsByThrownPoints = async (lobby, player, thrownPoints) => {
  let currentPlayerStats = lobby.game.playerStats[player];
  currentPlayerStats = {
    ...currentPlayerStats,
    score: currentPlayerStats.score - thrownPoints,
    totalScore: currentPlayerStats.totalScore + thrownPoints,
    dartsThrown: currentPlayerStats.dartsThrown + 1,
    turns: lobby.game.throwsRemaining === 1 ? currentPlayerStats.turns + 1 : currentPlayerStats.turns,
    average: ((currentPlayerStats.totalScore + thrownPoints) * 3) / (currentPlayerStats.dartsThrown + 1)
  };
  lobby.game.playerStats[player] = currentPlayerStats;

  await saveUpdatedPlayerStats(thrownPoints, player, lobby);
};

const checkIfPlayerHasWon = async (lobby, player, updatedScore, multiplier) => {
  const playerWon = updatedScore === 0 && (lobby.gameSettings.modeOut !== "double" || multiplier === 2);
  if (playerWon) {
    await handlePlayerWon(lobby, player);
  }
};

const handlePlayerWon = async (lobby, player) => {
  updateGameStatsForWinningPlayer(lobby, player);
  await savePlayerWinOrDefeat(lobby);
  await savePlayerCheckout(lobby);
};

module.exports = { updateScoreForCurrentPlayerStandardGames };
