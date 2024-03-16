const { updateRemainingThrows, updateGameStatsForWinningPlayer } = require("../../helpers/game.helper");

const validPoints = new Set([15, 16, 17, 18, 19, 20, 25, 0]);

const updateScoreForCurrentPlayerCri = async (lobby, { points, multiplier }) => {
  if (!validatePoints(points) || !validateMultiplier(multiplier)) return;

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

const validateMultiplier = (mulitplier) => {
  return [...Array.from({ length: 3 }, (_, i) => i + 1)].includes(mulitplier);
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

  lobby.game.playerStats[player].cricketStats[statsKey] = updatedCricketStatus;

  let closedByAll = checkIfNumberIsClosedByAllPlayers(lobby, statsKey);

  if (closedByAll) {
    setCricketStatusClosedForEverybody(lobby, statsKey);
  }

  let remainingScore = 0;
  const playerCanIncreaseScore = updatedCricketStatus === 3 && timesHitted > 0 && !closedByAll;
  if (playerCanIncreaseScore) {
    remainingScore = points * timesHitted;
  }

  increasePlayerScore(lobby, player, remainingScore);
};

const checkIfNumberIsClosedByAllPlayers = (lobby, statsKey) => {
  let numberClosedForAllPlayers = true;
  const playerStats = lobby.game.playerStats;

  lobby.players.forEach((player) => {
    if (player.isActive && playerStats[player.userID].cricketStats[statsKey] < 3) {
      numberClosedForAllPlayers = false;
      return;
    }
  });

  return numberClosedForAllPlayers;
};

const setCricketStatusClosedForEverybody = (lobby, statsKey) => {
  const playerStats = lobby.game.playerStats;
  lobby.players.forEach((player) => {
    const currentCricketStats = playerStats[player.userID].cricketStats[statsKey];
    if (player.isActive || currentCricketStats === 3) {
      playerStats[player.userID].cricketStats[statsKey] = 4;
    }
  });
};

const checkIfPlayerHasWon = (lobby, playerKey) => {
  const highestScore = calculateHighestScore(lobby);
  const playersScore = lobby.game.playerStats[playerKey].score;
  return playerHasClosedAll(lobby, playerKey) && playersScore >= highestScore;
};

const handlePlayerWon = async (lobby, playerKey) => {
  await updateGameStatsForWinningPlayer(lobby, playerKey);
};

const calculateHighestScore = (lobby) => {
  let highestScore = 0;
  lobby.players.forEach((player) => {
    const playersScore = lobby.game.playerStats[player.userID].score;
    if (player.isActive && playersScore > highestScore) {
      highestScore = playersScore;
    }
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

const checkIfAnyNumberIsClosedByAllPlayers = (lobby) => {
  const cricketStats = lobby.game.playerStats[lobby.players[0].userID].cricketStats;
  Object.keys(cricketStats).forEach((statsKey) => {
    if (checkIfNumberIsClosedByAllPlayers(lobby, statsKey)) {
      setCricketStatusClosedForEverybody(lobby, statsKey);
    }
  });
};

const checkIfAnyNumberIsNotClosedByAllPlayers = (lobby) => {
  const cricketStats = lobby.game.playerStats[lobby.players[lobby.game.currentPlayerIndex].userID].cricketStats;
  Object.keys(cricketStats).forEach((statsKey) => {
    if (!checkIfNumberIsClosedByAllPlayers(lobby, statsKey)) {
      setCricketStatusOpenForEverybody(lobby, statsKey);
    }
  });
};

const setCricketStatusOpenForEverybody = (lobby, statsKey) => {
  const playerStats = lobby.game.playerStats;
  lobby.players.forEach((player) => {
    if (playerStats[player.userID].cricketStats[statsKey] === 4) {
      playerStats[player.userID].cricketStats[statsKey] = 3;
    }
  });
};

module.exports = {
  updateScoreForCurrentPlayerCri,
  checkIfAnyPlayerHasWonCri,
  checkIfAnyNumberIsClosedByAllPlayers,
  checkIfAnyNumberIsNotClosedByAllPlayers
};
