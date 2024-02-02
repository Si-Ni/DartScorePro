import { Round } from "../helpers/calcCheckouts";
import React from "react";
import { InAndOutMode, PlayerToPlayerTotalGameStats } from "./global";

export interface PlayerStats {
  score: number;
  scoreAtBeginningOfRound: number;
  average: number;
  dartsThrown: number;
  totalScore: number;
  turns: number;
  lastThrows: string[];
  throwsRemaining: number;
  checkoutOptions: Round[];
}

export interface LocalStandardGamesProps {
  gamemodeTotalScore: number;
  players: string[];
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  throwsRemaining: number;
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  switchToNextPlayer(): void;
  updateRemainingThrows(): void;
  setThrowsRemaining: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
}
