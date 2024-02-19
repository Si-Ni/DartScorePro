const initialisePlayerStatsForStandardGame = (
  players,
  playerStats = {},
  totalScore,
  thrownPoints,
  winningPlayerIndex
) => {
  const initialPoints = {};
  players.forEach((player, index) => {
    const stats = playerStats[player.userID] || { average: 0, dartsThrown: 0, totalScore: 0 };
    initialPoints[player.userID] = {
      score: totalScore,
      scoreAtBeginningOfRound: totalScore,
      average:
        index === winningPlayerIndex
          ? ((stats.totalScore + (thrownPoints || 0)) * 3) / (stats.dartsThrown + 1) || 0
          : stats.average,
      dartsThrown: stats.dartsThrown + (index === winningPlayerIndex ? 1 : 0),
      totalScore: index === winningPlayerIndex ? stats.totalScore + (thrownPoints || 0) : stats.totalScore,
      turns: 0,
      lastThrows: [],
      throwsRemaining: 0
    };
  });
  return initialPoints;
};

const initialisePlayerStatsForRclGame = (players) => {
  const initialStats = {};
  players.forEach((player) => {
    initialStats[player.userID] = {
      currentTarget: 1,
      lastThrows: []
    };
  });
  return initialStats;
};

const initialisePlayerStatsForCriGame = (players) => {
  const initialStats = {};
  players.forEach((player) => {
    initialStats[player.userID] = {
      score: 0,
      cricketStats: {
        20: 0,
        19: 0,
        18: 0,
        17: 0,
        16: 0,
        15: 0,
        Bull: 0
      }
    };
  });
  return initialStats;
};

const initialiseForNewRound = (lobby, thrownPoints, winningPlayerIndex) => {
  const gamemode = lobby.gameSettings.selectedGamemode;
  lobby.game.currentRound = 1;
  lobby.game.currentPlayerIndex = lobby.game.startingPlayerIndex;
  lobby.game.throwsRemaining = 3;
  lobby.game.turns = 0;
  if (gamemode === "301" || gamemode === "501") {
    const totalScore = Number(lobby.gameSettings.selectedGamemode);
    lobby.game.gamemodeTotalScore = Number(totalScore);
    lobby.game.playerStats = initialisePlayerStatsForStandardGame(
      lobby.players,
      lobby.game.playerStats,
      totalScore,
      thrownPoints,
      winningPlayerIndex
    );
  } else if (gamemode === "rcl") {
    lobby.game.playerStats = initialisePlayerStatsForRclGame(lobby.players);
  } else if (gamemode === "cri") {
    lobby.game.playerStats = initialisePlayerStatsForCriGame(lobby.players);
  } else {
    console.error("selected gamemode not supported");
  }
};

module.exports = { initialisePlayerStatsForStandardGame, initialisePlayerStatsForRclGame, initialiseForNewRound };
