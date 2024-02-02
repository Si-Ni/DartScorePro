const initialisePlayerStats = (players) => {
    const initialStats = {};
    initialStats.forEach((index, player) => {
      initialPoints[player] = {
        score: gamemodeTotalScore,
        scoreAtBeginningOfRound: gamemodeTotalScore,
        average: 0,
        dartsThrown: 0,
        totalScore: 0,
        turns: 0,
        lastThrows: [],
        throwsRemaining: 0,
        isPlayersTurn: index === 0,
      };
    });
    return initialStats;
}

const initialiseTotalGameStats = (players) => {
    const initialStats = {};
    players.forEach((player) => {
      initialStats[player] = {
        sets: 0,
        legs: 0
      };
    });
    return initialStats;
}

const initialiseForNewRound = (lobbies, lobbyCode) => {
    lobbies[lobbyCode].currentRound = 0;
    lobbies[lobbyCode].startingPlayer = 0;
    lobbies[lobbyCode].currentPlayer = 0;
    lobbies[lobbyCode].playerStats = initialisePlayerStats(lobbies[lobbyCode].players);
}

const initialiseForNewGame = (lobbies, lobbyCode) => {
    initialiseForNewRound(lobbies, lobbyCode);
    lobbies[lobbyCode].totalGameStats = initialiseTotalGameStats(lobbies[lobbyCode].players)
}

module.exports = { initialiseForNewGame };
