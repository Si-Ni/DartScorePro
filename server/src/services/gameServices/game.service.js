const initialisePlayerStatsForStandardGame = require("./initPlayerStats.service");
const { lobbies, lobbyCodeRegex } = require("../lobby.service");

const initialiseForNewGame = (lobby) => {
  lobby.game = {};
  lobby.game.totalGameStats = initialiseTotalGameStats(lobby.players);
  lobby.game.winner = null;
  lobby.game.startingPlayerIndex = 0;
  lobby.gameStarted = true;
  initialiseForNewRound(lobby);
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
  console.log("test3");
  const gamemode = lobby.gameSettings.selectedGamemode;
  lobby.game.currentRound = 1;
  lobby.game.currentPlayerIndex = lobby.game.startingPlayerIndex;
  lobby.game.throwsRemaining = 3;
  lobby.game.turns = 0;
  if (gamemode === "301" || gamemode === "501") {
    const totalScore = Number(lobby.gameSettings.selectedGamemode);
    lobby.game.gamemodeTotalScore = Number(totalScore);
    console.log(lobby.game);
    lobby.game.playerStats = initialisePlayerStatsForStandardGame(lobby.players, totalScore);
    console.log(lobby.game);
  } else if (gamemode === "rcl") {
    //lobby.game.playerStats = initialisePlayerStatsForRclGame(lobby.players);
  } else {
    console.error("selected gamemode not supported");
  }
};

module.exports = (io) => {
  const handleGameStarted = function ({ lobbyCode, gameSettings }) {
    const socket = this;
    const isLeader = lobbies[lobbyCode]?.players.find((player) => player.socketId === socket.id)?.isLeader ?? false;
    const isValidGamemode = ["301", "501", "rcl", "cri"].includes(gameSettings.selectedGamemode);

    if (!lobbyCodeRegex.test(lobbyCode)) return socket.emit("invalidLobbyCode");

    if (lobbies[lobbyCode] && isLeader && isValidGamemode && !gameSettings.hasOwnProperty("__proto__")) {
      lobbies[lobbyCode].gameSettings = gameSettings;
      initialiseForNewGame(lobbies[lobbyCode]);
      const responseData = { gameSettings: lobbies[lobbyCode].gameSettings, game: lobbies[lobbyCode].game };
      io.to(lobbyCode).emit("leaderStartedGame", responseData);
    }
  };

  return {
    handleGameStarted
  };
};

module.exports.initialiseForNewRound = initialiseForNewRound;
