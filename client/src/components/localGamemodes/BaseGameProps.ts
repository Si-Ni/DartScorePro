import { PlayerToPlayerTotalGameStats } from "../../types/playerStats.ts";

export interface BaseGameProps {
  players: string[];
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  setsToWin: number;
  legsForSet: number;
  throwsRemaining: number;
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  switchToNextPlayer(): void;
  updateRemainingThrows(): void;
}
