import { Socket } from "socket.io-client";
import React from "react";

export interface CreateLobbyProps {
  cbBackBtnClicked(): void;
  socket: Socket;
  setLobbyCodeGlobal: React.Dispatch<React.SetStateAction<string>>;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
  displayUserID: string;
}
