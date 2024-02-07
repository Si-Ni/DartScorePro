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

const initialiseForNewRound = (lobby) => {
  const gamemode = lobby.gameSettings.selectedGamemode;
  lobby.game.currentRound = 1;
  lobby.game.currentPlayerIndex = lobby.game.startingPlayerIndex;
  lobby.game.throwsRemaining = 3;
  lobby.game.turns = 0;
  if (gamemode === "301" || gamemode === "501") {
    const totalScore = Number(lobby.gameSettings.selectedGamemode);
    lobby.game.gamemodeTotalScore = Number(totalScore);
    lobby.game.playerStats = initialisePlayerStatsForStandardGame(lobby.players, totalScore);
  } else if (gamemode === "rcl") {
    lobby.game.playerStats = initialisePlayerStatsForRclGame(lobby.players);
  } else {
    console.error("selected gamemode not supported");
  }
};

module.exports = { initialisePlayerStatsForStandardGame, initialisePlayerStatsForRclGame, initialiseForNewRound };
