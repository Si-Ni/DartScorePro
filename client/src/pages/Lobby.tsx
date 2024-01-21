import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Lobby({ socket }) {
  const navigate = useNavigate();
  const [lobbyCode, setLobbyCode] = useState("");

  const createLobby = () => {
    socket.emit("createLobby");

    socket.once("lobbyCreated", (newLobbyCode) => {
      setLobbyCode(newLobbyCode);
      navigate(`/multiplayer/lobby/${newLobbyCode}`);
    });
  };

  const joinLobby = () => {
    socket.emit("joinLobby", lobbyCode);

    socket.once("lobbyJoined", () => {
      navigate(`/multiplayer/lobby/${lobbyCode}`);
    });

    socket.once("lobbyNotFound", () => {
      alert("Lobby not found. Please check the code and try again.");
    });
  };

  return (
    <div>
      <h1>Lobby Page</h1>
      <button onClick={createLobby}>Create Lobby</button>
      <div>
        <input
          type="text"
          placeholder="Enter Lobby Code"
          value={lobbyCode}
          onChange={(e) => setLobbyCode(e.target.value)}
        />
        <button onClick={joinLobby}>Join Lobby</button>
      </div>
    </div>
  );
}

export default Lobby;
