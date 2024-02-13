const generateCode = require("../helpers/generateCode.helper");
const { checkForWinIfNecessary, switchPlayerIfNecessary } = require("./gameServices/rejoin.service");
const lobbies = {};
const lobbyCodeRegex = /^[A-Z0-9]{6}$/;

module.exports = (io) => {
  const createLobby = function (userID) {
    const socket = this;
    const lobbyCode = generateCode();
    lobbies[lobbyCode] = {
      gameStarted: false,
      players: [{ userID, socketId: socket.id, isLeader: true, isActive: true }]
    };

    socket.join(lobbyCode);
    socket.emit("lobbyCreated", lobbyCode);
  };

  const joinLobby = async function ({ lobbyCode, userID }) {
    const socket = this;
    const socketId = socket.id;
    const lobby = lobbies[lobbyCode];

    if (!lobbyCodeRegex.test(lobbyCode) || !lobby) return socket.emit(lobbyCode ? "lobbyNotFound" : "invalidLobbyCode");

    const playerIndex = lobby.players.findIndex((player) => player.userID === userID);
    const playerRejoining = playerIndex !== -1;

    if (playerRejoining) {
      lobby.players[playerIndex].socketId = socketId;
      lobby.players[playerIndex].isActive = true;
    } else {
      lobby.players.push({ userID, socketId, isLeader: false, isActive: true });
    }

    socket.join(lobbyCode);
    socket.emit("lobbyJoined", lobbyCode);

    io.to(lobbyCode).emit("updatePlayersList", lobby.players);

    if (playerRejoining && lobby.gameStarted) {
      const settingsAndGame = { gameSettings: lobbies[lobbyCode].gameSettings, game: lobbies[lobbyCode].game };
      socket.emit("leaderStartedGame", settingsAndGame);
      await checkForWinIfNecessary(lobby);
      io.to(lobbyCode).emit("gameStatsUpdated", lobbies[lobbyCode].game);
    }
  };

  const leaveLobby = async function (socketId = this.id) {
    const lobbyCodes = Object.keys(lobbies);
    for (const lobbyCode of lobbyCodes) {
      const lobby = lobbies[lobbyCode];
      const disconnectedPlayer = lobby.players.find((player) => player.socketId === socketId);

      if (disconnectedPlayer) {
        disconnectedPlayer.socketId = "";
        disconnectedPlayer.isActive = false;

        io.to(lobbyCode).emit("updatePlayersList", lobby.players);
        if (lobby.gameStarted) {
          switchPlayerIfNecessary(lobby, disconnectedPlayer.userID);
          await checkForWinIfNecessary(lobby);
          io.to(lobbyCode).emit("gameStatsUpdated", lobbies[lobbyCode].game);
        }
      }
    }
  };

  const disconnect = async function () {
    const socket = this;

    console.log("User disconnected:", socket.id);
    await leaveLobby(socket.id);
  };

  return {
    createLobby,
    joinLobby,
    leaveLobby,
    disconnect
  };
};

module.exports.lobbies = lobbies;
module.exports.lobbyCodeRegex = lobbyCodeRegex;
