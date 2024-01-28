const generateCode = require("../helpers/generateCode.helper");

const lobbies = {};
const lobbyCodeRegex = /^[A-Z0-9]{6}$/;

const configureLobbyService = (io) => {
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("createLobby", (userID) => {
      const lobbyCode = generateCode();
      lobbies[lobbyCode] = { players: [{ userID: userID, socketId: socket.id, isLeader: true }] };
      socket.join(lobbyCode);
      socket.emit("lobbyCreated", lobbyCode);
    });

    socket.on("joinLobby", ({ lobbyCode, userID }) => {
      const socketId = socket.id;

      const lobby = lobbies[lobbyCode];

      const isLobbyCode = lobbyCodeRegex.test(lobbyCode);

      if (!isLobbyCode) return socket.emit("invalidLobbyCode");

      if (!lobby) return socket.emit("lobbyNotFound");

      const playerIndex = lobby.players.findIndex((player) => player.userID === userID);

      if (playerIndex !== -1) {
        lobby.players[playerIndex].socketId = socketId;
      } else {
        lobby.players.push({ userID, socketId, isLeader: false });
      }
      socket.join(lobbyCode);

      socket.emit("lobbyJoined", lobbyCode);

      const updatedPlayers = lobbies[lobbyCode].players
        .filter((player) => player.socketId !== "")
        .map((player) => player.userID);
      socket.emit("updatePlayersList", updatedPlayers);
      io.to(lobbyCode).emit("updatePlayersList", updatedPlayers);
    });

    socket.on("joinedSuccessfully", (lobbyCode) => {
      if (lobbies[lobbyCode]) {
        io.to(lobbyCode).emit(
          "updatePlayersList",
          lobbies[lobbyCode].players.map((player) => player.userID)
        );
      }
    });

    socket.on("gamemodeSelected", ({ lobbyCode, gamemode }) => {
      const isLeader = lobbies[lobbyCode]?.players.find((player) => player.socketId === socket.id)?.isLeader ?? false;
      const isValidGamemode = ["301", "501", "rcl", "cri"].includes(gamemode);
      if (lobbies[lobbyCode] && isLeader && isValidGamemode) {
        socket.to(lobbyCode).emit("leaderSelectedGamemode", gamemode);
      }
    });

    socket.on("leaveLobby", () => {
      leaveLobby(io, socket.id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      leaveLobby(io, socket.id);
    });
  });
};

const leaveLobby = (io, socketId) => {
  Object.keys(lobbies).forEach((lobbyCode) => {
    const lobby = lobbies[lobbyCode];

    const disconnectedPlayer = lobby.players.find((player) => player.socketId === socketId);

    if (disconnectedPlayer) {
      disconnectedPlayer.socketId = "";

      const updatedPlayers = lobby.players.filter((player) => player.socketId !== "").map((player) => player.userID);

      io.to(lobbyCode).emit("updatePlayersList", updatedPlayers);
    }
  });
};

module.exports = { configureLobbyService };
