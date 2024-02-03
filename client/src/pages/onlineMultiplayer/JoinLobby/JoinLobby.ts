import { Socket } from "socket.io-client";
import React from "react";

export interface JoinLobbyProps {
  cbBackBtnClicked(): void;
  socket: Socket;
  setLobbyCodeGlobal: React.Dispatch<React.SetStateAction<string>>;
  displayUserID: string;
}
