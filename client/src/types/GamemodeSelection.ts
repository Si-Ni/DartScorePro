import React from "react";
import { Gamemode } from "./global";

export interface GamemodeSelectionProps {
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
}
