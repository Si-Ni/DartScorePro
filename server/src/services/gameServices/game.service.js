const { findPlayerIndexBySocketId } = require("../../helpers/game.helper");
const { initialiseForNewRound } = require("../../helpers/initPlayerStats.helper");
const { lobbies, lobbyCodeRegex } = require("../lobby.service");
const { updateScoreForCurrentPlayerStandardGames } = require("./standardGame.service");
const { updateScoreForCurrentPlayerRcl } = require("./rclGame.service");
const { updateScoreForCurrentPlayerCri } = require("./criGame.service");
const validateSettings = require("../../helpers/validateSettings.helper");

const initialiseForNewGame = (lobby) => {
  lobby.game = {};
  lobby.game.totalGameStats = initialiseTotalGameStats(lobby.players);
  lobby.game.winner = null;
  lobby.game.startingPlayerOfSetIndex = 0;
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

const updateGameWithThrownPoints = async (socketId, lobby, args) => {
  const playerIndex = findPlayerIndexBySocketId(socketId, lobby.players);
  if (playerIndex === lobby.game.currentPlayerIndex) {
    await forwardRequestToResponsibleService(lobby, args);
  }
};

const forwardRequestToResponsibleService = async (lobby, args) => {
  const gamemode = lobby.gameSettings.selectedGamemode;
  if (gamemode === "301" || gamemode === "501") {
    await updateScoreForCurrentPlayerStandardGames(lobby, args);
  } else if (gamemode === "rcl") {
    await updateScoreForCurrentPlayerRcl(lobby, args);
  } else if (gamemode === "cri") {
    await updateScoreForCurrentPlayerCri(lobby, args);
  } else {
    console.error("selected gamemode not supported");
  }
};

module.exports = (io) => {
  const handleGameStarted = function ({ lobbyCode, gameSettings }) {
    const socket = this;
    const isLeader = lobbies[lobbyCode]?.players.find((player) => player.socketId === socket.id)?.isLeader ?? false;
    validSettings = validateSettings(gameSettings);

    if (!lobbyCodeRegex.test(lobbyCode)) return socket.emit("invalidLobbyCode");

    if (lobbies[lobbyCode] && isLeader && validSettings && !gameSettings.hasOwnProperty("__proto__")) {
      lobbies[lobbyCode].gameSettings = gameSettings;
      initialiseForNewGame(lobbies[lobbyCode]);
      const responseData = { gameSettings: lobbies[lobbyCode].gameSettings, game: lobbies[lobbyCode].game };
      io.to(lobbyCode).emit("leaderStartedGame", responseData);
    }
  };

  const handleGameInput = async function ({ lobbyCode, ...args }) {
    const socket = this;
    if (lobbies[lobbyCode] && lobbies[lobbyCode].gameStarted) {
      await updateGameWithThrownPoints(socket.id, lobbies[lobbyCode], args);
      io.to(lobbyCode).emit("gameStatsUpdated", lobbies[lobbyCode].game);
    }
  };

  return {
    handleGameStarted,
    handleGameInput
  };
};
