const generateCode = require("../helpers/generateCode.helper");

module.exports = (io = null) => {
  const lobbies = {};
  const lobbyCodeRegex = /^[A-Z0-9]{6}$/;

  const createLobby = function (userID) {
    const socket = this;
    const lobbyCode = generateCode();
    lobbies[lobbyCode] = { gameStarted: false, players: [{ userID, socketId: socket.id, isLeader: true }] };

    socket.join(lobbyCode);
    socket.emit("lobbyCreated", lobbyCode);
  };

  const joinLobby = function ({ lobbyCode, userID }) {
    const socket = this;

    const socketId = socket.id;

    const lobby = lobbies[lobbyCode];

    if (!lobbyCodeRegex.test(lobbyCode) || !lobby) return socket.emit(lobbyCode ? "lobbyNotFound" : "invalidLobbyCode");

    const playerIndex = lobby.players.findIndex((player) => player.userID === userID);

    if (playerIndex !== -1) lobby.players[playerIndex].socketId = socketId;
    else lobby.players.push({ userID, socketId, isLeader: false });

    socket.join(lobbyCode);
    socket.emit("lobbyJoined", lobbyCode);

    const updatedPlayers = lobby.players
      .filter((player) => player.socketId !== "")
      .map((player) => ({ userID: player.userID, isLeader: player.isLeader }));

    io.to(lobbyCode).emit("updatePlayersList", updatedPlayers);

    lobby.gameSettings && io.to(lobbyCode).emit("isGameStarted");
  };

  const leaveLobby = function (socketId = this.id) {
    Object.keys(lobbies).forEach((lobbyCode) => {
      const lobby = lobbies[lobbyCode];
      const disconnectedPlayer = lobby.players.find((player) => player.socketId === socketId);

      if (disconnectedPlayer) {
        disconnectedPlayer.socketId = "";
        const updatedPlayers = lobby.players.filter((player) => player.socketId !== "").map((player) => player);

        io.to(lobbyCode).emit("updatePlayersList", updatedPlayers);
      }
    });
  };

  const disconnect = function () {
    const socket = this;

    console.log("User disconnected:", socket.id);
    leaveLobby(socket.id);
  };

  return {
    lobbies,
    lobbyCodeRegex,
    createLobby,
    joinLobby,
    leaveLobby,
    disconnect
  };
};
