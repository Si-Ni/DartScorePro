const initialisePlayerStatsForStandardGame = (players, gamemodeTotalScore) => {
  const initialStats = {};
  players.forEach((player) => {
    initialStats[player.userID] = {
      score: gamemodeTotalScore,
      scoreAtBeginningOfRound: gamemodeTotalScore,
      average: 0,
      dartsThrown: 0,
      totalScore: 0,
      turns: 0,
      lastThrows: [],
      throwsRemaining: 0
    };
  });
  return initialStats;
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

module.exports = { initialisePlayerStatsForStandardGame, initialisePlayerStatsForRclGame };
