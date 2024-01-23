const generateCode = require("../helpers/generateCode.helper");

const lobbies = {};

const configureLobbyService = (io) => {
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("createLobby", () => {
      const lobbyCode = generateCode();
      lobbies[lobbyCode] = { players: [{ socketId: socket.id, isLeader: true }] };
      socket.join(lobbyCode);
      socket.emit("lobbyCreated", lobbyCode);
    });

    socket.on("joinLobby", (lobbyCode) => {
      const socketId = socket.id;
      const lobby = lobbies[lobbyCode];

      if (!lobby) {
        return socket.emit("lobbyNotFound");
      }

      if (lobby.players.some((player) => player.socketId === socketId)) return;

      socket.join(lobbyCode);
      lobby.players.push({ socketId, isLeader: false });
      socket.emit("lobbyJoined", lobbyCode);
      io.to(lobbyCode).emit(
        "updatePlayersList",
        lobby.players.map((player) => player.socketId)
      );
    });

    socket.on("joinedSuccessfully", (lobbyCode) => {
      if (lobbies[lobbyCode]) {
        socket.emit(
          "updatePlayersList",
          lobbies[lobbyCode].players.map((player) => player.socketId)
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
    lobbies[lobbyCode].players = lobbies[lobbyCode].players.filter((player) => player.socketId !== socketId);

    io.to(lobbyCode).emit(
      "updatePlayersList",
      lobbies[lobbyCode].players.map((player) => player.socketId)
    );
  });
};

module.exports = { configureLobbyService };
