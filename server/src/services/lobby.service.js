const lobbies = {};

const configureLobbyService = (io) => {
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("createLobby", () => {
      const lobbyCode = generateLobbyCode();
      lobbies[lobbyCode] = { players: [socket.id], messages: [] };
      socket.join(lobbyCode);
      socket.emit("lobbyCreated", lobbyCode);
    });

    socket.on("joinLobby", (lobbyCode) => {
      console.log(lobbyCode);
      if (lobbies[lobbyCode]) {
        console.log("here", lobbies, lobbyCode);

        socket.join(lobbyCode);

        io.to(lobbyCode).emit("playerJoined", socket.id);

        lobbies[lobbyCode].players.push(socket.id);

        socket.emit("lobbyJoined", lobbyCode);

        io.to(lobbyCode).emit("updatePlayersList", lobbies[lobbyCode].players);
      } else {
        socket.emit("lobbyNotFound");
      }
    });

    socket.on("joinedSuccessfully", (lobbyCode) => {
      console.log(lobbyCode);
      if (lobbies[lobbyCode]) {
        socket.emit("playerList", lobbies[lobbyCode].players);
      }
    });

    socket.on("sendMessage", ({ code, message, userID }) => {
      console.log("user", socket.id, "sends", message);
      if (lobbies[code]) {
        lobbies[code].messages.push({ userID: socket.id, message });

        console.log("Broadcasting message:", code, message, userID, lobbies[code]);
        socket.to(code).emit("messageReceived", { userID, message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      Object.keys(lobbies).forEach((lobbyCode) => {
        lobbies[lobbyCode].players = lobbies[lobbyCode].players.filter((player) => player !== socket.id);

        io.to(lobbyCode).emit("updatePlayersList", lobbies[lobbyCode].players);
      });
    });
  });
};

const generateLobbyCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
module.exports = { configureLobbyService };
