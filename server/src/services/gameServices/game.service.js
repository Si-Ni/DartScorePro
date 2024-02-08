const { findPlayerIndexBySocketId } = require("../../helpers/game.helper");
const { initialiseForNewRound } = require("../../helpers/initPlayerStats.helper");
const { lobbies, lobbyCodeRegex } = require("../lobby.service");
const { updateScoreForCurrentPlayerStandardGames } = require("./standardGame.service");
const { updateScoreForCurrentPlayerRcl } = require("./rclGame.service");
const { updateScoreForCurrentPlayerCri } = require("./criGame.service");

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

const updateGameWithThrownPoints = (socketId, lobby, args) => {
  const playerIndex = findPlayerIndexBySocketId(socketId, lobby.players);
  if (playerIndex === lobby.game.currentPlayerIndex) {
    forwardRequestToResponsibleService(lobby, args);
  }
};

const forwardRequestToResponsibleService = (lobby, args) => {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "301" || gamemode === "501") {
    updateScoreForCurrentPlayerStandardGames(lobby, args);
  } else if (gamemode === "rcl") {
    updateScoreForCurrentPlayerRcl(lobby, args);
  } else if (gamemode === "cri") {
    updateScoreForCurrentPlayerCri(lobby, args);
  } else {
    console.error("selected gamemode not supported");
  }
};

module.exports = (io) => {
  const handleGameStarted = function ({ lobbyCode, gameSettings }) {
    const socket = this;
    const isLeader = lobbies[lobbyCode]?.players.find((player) => player.socketId === socket.id)?.isLeader ?? false;
    const validGamemodes = ["301", "501", "rcl", "cri"];
    const isValidGamemode = validGamemodes.includes(gameSettings.selectedGamemode);

    if (!lobbyCodeRegex.test(lobbyCode)) return socket.emit("invalidLobbyCode");

    if (lobbies[lobbyCode] && isLeader && isValidGamemode && !gameSettings.hasOwnProperty("__proto__")) {
      lobbies[lobbyCode].gameSettings = gameSettings;
      initialiseForNewGame(lobbies[lobbyCode]);
      const responseData = { gameSettings: lobbies[lobbyCode].gameSettings, game: lobbies[lobbyCode].game };
      io.to(lobbyCode).emit("leaderStartedGame", responseData);
    }
  };

  const handleGameInput = function ({ lobbyCode, ...args }) {
    const socket = this;
    if (lobbies[lobbyCode] && lobbies[lobbyCode].gameStarted) {
      updateGameWithThrownPoints(socket.id, lobbies[lobbyCode], args);
      io.to(lobbyCode).emit("gameStatsUpdated", lobbies[lobbyCode].game);
    }
  };

  return {
    handleGameStarted,
    handleGameInput
  };
};
