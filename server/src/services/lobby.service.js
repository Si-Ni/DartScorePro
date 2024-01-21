// lobby.service.js

const lobbies = {}; // Store active lobbies

const configureLobbyService = (io) => {
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    // Handle creating a new lobby
    socket.on("createLobby", () => {
      const lobbyCode = generateLobbyCode();
      lobbies[lobbyCode] = { players: [socket.id], messages: [] };
      socket.emit("lobbyCreated", lobbyCode);
    });

    // Handle joining an existing lobby
    socket.on("joinLobby", (lobbyCode) => {
      if (lobbies[lobbyCode]) {
        console.log("here", lobbies, lobbyCode);

        // Join the room corresponding to the lobby code
        socket.join(lobbyCode);

        lobbies[lobbyCode].players.push(socket.id);
        socket.emit("lobbyJoined", lobbyCode);
        socket.to(lobbyCode).emit("playerJoined", socket.id);
      } else {
        socket.emit("lobbyNotFound");
      }
    });

    socket.on("sendMessage", ({ code, message, userID }) => {
      console.log("user", socket.id, "sends", message);
      if (lobbies[code]) {
        lobbies[code].messages.push({ userID: socket.id, message });

        // Broadcast the message to all players in the lobby
        console.log("Broadcasting message:", code, message, userID, lobbies[code]);
        socket.to(code).emit("messageReceived", { userID, message });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Remove the disconnected user from active lobbies
      Object.keys(lobbies).forEach((lobbyCode) => {
        lobbies[lobbyCode].players = lobbies[lobbyCode].players.filter((player) => player !== socket.id);
      });
    });
  });
};

const generateLobbyCode = () => {
  // Generate a simple random lobby code for demonstration purposes
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
module.exports = { configureLobbyService };
