import React from "react";
import { InAndOutMode } from "../../../types/global";
import { BaseGameProps } from "../BaseGameProps";

export interface LocalStandardGamesProps extends BaseGameProps {
  gamemodeTotalScore: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  setThrowsRemaining: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
}
