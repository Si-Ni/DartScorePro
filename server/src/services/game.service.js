const initialisePlayerStats = (players) => {
  const initialStats = {};
  players.forEach((player, index) => {
    console.log(player);
    initialStats[player.userID] = {
      score: 301,
      scoreAtBeginningOfRound: 301,
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

const initialiseTotalGameStats = (players) => {
  const initialStats = {};
  players.forEach((player) => {
    initialStats[player.userID] = {
      sets: 0,
      legs: 0
    };
  });
  return initialStats;
};

const initialiseForNewRound = (lobby) => {
  lobby.game.currentRound = 0;
  lobby.game.startingPlayer = 0;
  lobby.game.currentPlayer = 0;
  lobby.game.throwsRemaining = 3;
  lobby.game.playerStats = initialisePlayerStats(lobby.players);
};

const initialiseForNewGame = (lobby) => {
  lobby.game = {};
  lobby.game.totalGameStats = initialiseTotalGameStats(lobby.players);
  lobby.gameStarted = true;
  initialiseForNewRound(lobby);
};

module.exports = { initialiseForNewGame };
