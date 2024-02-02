import { Socket } from "socket.io-client";
import React from "react";

export interface OnlineMultiplayerProps {
  cbBackBtnClicked(): void;
  displayUserID: string;
  socket: Socket;
  lobbyCode: string;
  isLobbyLeader: boolean;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
}
