import React from "react";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface GameSettingsProps {
  selectedGamemode: Gamemode;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}
