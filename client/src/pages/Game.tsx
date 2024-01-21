import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Game({ socket, displayUserID }) {
  const { code } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    console.log("here");
    socket.on("messageReceived", ({ userID, message }) => {
      setMessages((prevMessages) => [...prevMessages, { userID, message }]);
    });
    socket.on("lobbyJoined", ({ userID }) => {
      console.log(userID, "joined");
    });
    return () => {
      socket.off("messageReceived");
    };
  }, [socket]);

  const sendMessage = () => {
    // Emit a message to the server
    socket.emit("sendMessage", { code, message: newMessage, userID: displayUserID });

    // Clear the input field
    setNewMessage("");
  };

  return (
    <div>
      <h1>Game Page</h1>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{`${message.userID}: ${message.message}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Game;
