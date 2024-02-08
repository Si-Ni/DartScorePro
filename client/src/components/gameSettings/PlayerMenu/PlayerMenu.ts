import React from "react";

export interface PlayerMenuProps {
  players: string[];
  maxPlayers: number;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  isEditable: boolean;
  playerCountInfo: string;
}
