import React from "react";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface PlayersAndSettingsProps {
  players: string[];
  maxPlayers: number;
  validNumberOfPlayers: boolean;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  handleSettingsNextBtnClicked(): void;
  cbBackBtnClicked(): void;
  playerCountInfo: string;
}
