import { Round } from "../helpers/calcCheckouts";

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

export type PlayerToPlayerStats = { [player: string]: PlayerStats };

export interface PlayerStatsRCl {
  currentTarget: number;
  lastThrows: string[];
}

export type PlayerToPlayerStatsRCl = { [player: string]: PlayerStatsRCl };

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

export interface PlayerTotalGameStats {
  sets: number;
  legs: number;
}

export type PlayerToPlayerTotalGameStats = { [player: string]: PlayerTotalGameStats };
