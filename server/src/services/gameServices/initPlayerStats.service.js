module.exports = () => {
  const initialisePlayerStatsForStandardGame = function (players, gamemodeTotalScore) {
    const initialStats = {};
    players.forEach((player, index) => {
      initialStats[player.userID] = {
        score: gamemodeTotalScore,
        scoreAtBeginningOfRound: gamemodeTotalScore,
        average: 0,
        dartsThrown: 0,
        totalScore: 0,
        turns: 0,
        lastThrows: [],
        throwsRemaining: 0,
        isPlayersTurn: index === 0
      };
    });
    return initialStats;
  };

  return {
    initialisePlayerStatsForStandardGame
  };
};
