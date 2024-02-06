import React from "react";
import { Socket } from "socket.io-client";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface OnlineMultiplayerSettingsProps {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  socket: Socket;
  lobbyCode: string;
  isLobbyLeader: boolean;
  setsToWin: number;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  cbNextBtnClicked(): void;
  displayUserID: string;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  cbBackBtnClicked(): void;
}
