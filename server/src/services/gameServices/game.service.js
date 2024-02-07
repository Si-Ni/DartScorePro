const initialisePlayerStatsForStandardGame = require("./initPlayerStats.service");
const { lobbies } = require("../lobby.service");
console.log(lobbies);

const initialiseForNewGame = (lobby) => {
  console.log(lobbies);
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

module.exports = () => {
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
      //lobby.game.playerStats = initialisePlayerStatsForRclGame(lobby.players);
    } else {
      console.error("selected gamemode not supported");
    }
  };
  return {
    initialiseForNewRound
  };
};

module.exports = (io) => {
  const handleGameStarted = function ({ lobbyCode, gameSettings }) {
    initialiseForNewGame(lobbies[lobbyCode]);
    const socket = this;
    console.log(lobbies);
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
