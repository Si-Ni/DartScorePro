const savePlayerWinOrDefeat = require("../../helpers/savePlayerWinOrDefeat.helper");
const {
  updateRemainingThrows,
  updateGameStatsForWinningPlayer,
  resetRoundStatsForNextGame
} = require("../../helpers/game.helper");

const validPoints = new Set([15, 16, 17, 18, 19, 20, 25, 0]);

const updateScoreForCurrentPlayerCri = async (lobby, { points, multiplier }) => {
  if (!validatePoints(points)) return;

  const currentPlayerIndex = lobby.game.currentPlayerIndex;
  const currentPlayer = lobby.players[currentPlayerIndex].userID;

  updatePlayerStats(lobby, currentPlayer, points, multiplier);

  if (checkIfPlayerHasWon(lobby, currentPlayer)) {
    await handlePlayerWon(lobby, currentPlayer);
  } else {
    updateRemainingThrows(lobby);
  }
};

const validatePoints = (points) => {
  return validPoints.has(points);
};

const updatePlayerStats = (lobby, player, points, multiplier) => {
  if (points === 0) return;

  const statsKey = getCricketStatsKey(points);
  const currentCricketStatusValue = lobby.game.playerStats[player].cricketStats[statsKey];

  if (currentCricketStatusValue < 3) {
    updateCricketStatusAndScore(lobby, player, points, multiplier);
  } else if (currentCricketStatusValue === 3) {
    increasePlayerScore(lobby, player, points * multiplier);
  }
};

const getCricketStatsKey = (points) => {
  return points === 25 ? "Bull" : points.toString();
};

const updateCricketStatusAndScore = (lobby, player, points, multiplier) => {
  const statsKey = getCricketStatsKey(points);

  let timesHitted = multiplier;
  let updatedCricketStatus = lobby.game.playerStats[player].cricketStats[statsKey];

  while (updatedCricketStatus < 3 && timesHitted > 0) {
    timesHitted--;
    updatedCricketStatus++;
  }

  const numberIsClosedForAllPlayers =
    updatedCricketStatus === 3 && checkIfNumberIsClosedByOtherPlayers(lobby, player, statsKey);

  if (numberIsClosedForAllPlayers) {
    setCricketStatusClosedForEverybody(lobby, statsKey);
    updatedCricketStatus++;
  }

  let remainingScore = 0;
  const playerCanIncreaseScore = updatedCricketStatus === 3 && timesHitted > 0;
  if (playerCanIncreaseScore) {
    remainingScore = points * timesHitted;
  }

  updateCricketStatusAndAddScoreForPlayer(lobby, player, statsKey, updatedCricketStatus, remainingScore);
};

const checkIfNumberIsClosedByOtherPlayers = (lobby, currentPlayer, statsKey) => {
  let numberClosedByOtherPlayers = true;
  const playerStats = lobby.game.playerStats;
  Object.keys(playerStats).forEach((playerKey) => {
    const numberNotClosed = playerKey != currentPlayer && playerStats[playerKey].cricketStats[statsKey] < 3;
    if (numberNotClosed) {
      numberClosedByOtherPlayers = false;
      return;
    }
  });
  return numberClosedByOtherPlayers;
};

const setCricketStatusClosedForEverybody = (lobby, statsKey) => {
  const playerStats = lobby.game.playerStats;
  Object.keys(playerStats).forEach((playerKey) => {
    playerStats[playerKey].cricketStats[statsKey] = 4;
  });
};

const updateCricketStatusAndAddScoreForPlayer = (lobby, player, statsKey, updatedCricketStatus, thrownPoints) => {
  const currentPlayerStats = lobby.game.playerStats[player];
  currentPlayerStats.cricketStats[statsKey] = updatedCricketStatus;
  currentPlayerStats.score += thrownPoints;
};

const checkIfPlayerHasWon = (lobby, playerKey) => {
  const highestScore = calculateHighestScore(lobby);
  const playersScore = lobby.game.playerStats[playerKey].score;
  console.log(highestScore, playersScore);
  return playerHasClosedAll(lobby, playerKey) && playersScore >= highestScore;
};

const handlePlayerWon = async (lobby, playerKey) => {
  updateGameStatsForWinningPlayer(lobby, playerKey);
  await savePlayerWinOrDefeat(lobby);
  resetRoundStatsForNextGame(lobby);
};

const calculateHighestScore = (lobby) => {
  let highestScore = 0;
  Object.keys(lobby.game.playerStats).forEach((playerKey) => {
    const playersScore = lobby.game.playerStats[playerKey].score;
    if (playersScore > highestScore) highestScore = playersScore;
  });
  return highestScore;
};

const playerHasClosedAll = (lobby, playerKey) => {
  const currentPlayerCricketStats = lobby.game.playerStats[playerKey].cricketStats;
  let closedAll = true;
  Object.keys(currentPlayerCricketStats).forEach((cricketStatus) => {
    if (currentPlayerCricketStats[cricketStatus] < 3) {
      closedAll = false;
      return;
    }
  });
  return closedAll;
};

const increasePlayerScore = (lobby, player, thrownPoints) => {
  lobby.game.playerStats[player].score += thrownPoints;
};

const checkIfAnyPlayerHasWonCri = async (lobby) => {
  await lobby.players.forEach(async (player) => {
    if (player.isActive) {
      if (checkIfPlayerHasWon(lobby, player.userID)) await handlePlayerWon(lobby, player.userID);
    }
  });
};

module.exports = { updateScoreForCurrentPlayerCri, checkIfAnyPlayerHasWonCri };
