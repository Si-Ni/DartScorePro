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
      if (lobbies[lobbyCode]) {
        socket.join(lobbyCode);

        lobbies[lobbyCode].players.push({ socketId: socket.id, isLeader: false });

        socket.emit("lobbyJoined", lobbyCode);

        io.to(lobbyCode).emit(
          "updatePlayersList",
          lobbies[lobbyCode].players.map((player) => player.socketId)
        );
      } else {
        socket.emit("lobbyNotFound");
      }
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
    lobbies[lobbyCode].players = lobbies[lobbyCode].players.filter((player) => player !== socketId);

    io.to(lobbyCode).emit(
      "updatePlayersList",
      lobbies[lobbyCode].players.map((player) => player.socketId)
    );
  });
};


module.exports = { configureLobbyService };
