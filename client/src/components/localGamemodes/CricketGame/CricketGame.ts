import { PlayerToPlayerTotalGameStats } from "../../../types/global";

export interface CricketGameProps {
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

// 4 = closed for all players
export type CricketStatus = 0 | 1 | 2 | 3 | 4;

export interface CricketStats {
  20: CricketStatus;
  19: CricketStatus;
  18: CricketStatus;
  17: CricketStatus;
  16: CricketStatus;
  15: CricketStatus;
  Bull: CricketStatus;
  [key: string]: CricketStatus;
}

export interface PlayerStatsCricket {
  score: number;
  cricketStats: CricketStats;
}

export type PlayerToPlayerStatsCricket = { [player: string]: PlayerStatsCricket };
