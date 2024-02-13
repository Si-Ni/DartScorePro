import React from "react";

export interface PlayerMenuProps {
  players: string[];
  maxPlayers: number;
  isEditable: boolean;
  playerCountInfo: string;
  setPlayers?: React.Dispatch<React.SetStateAction<string[]>>;
}
