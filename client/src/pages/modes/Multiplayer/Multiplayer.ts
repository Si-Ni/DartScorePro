import { Socket } from "socket.io-client";
import React from "react";

export interface MultiplayerProps {
  socket: Socket;
  lobbyCode: string;
  setLobbyCode: React.Dispatch<React.SetStateAction<string>>;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
  displayUserID: string;
}
