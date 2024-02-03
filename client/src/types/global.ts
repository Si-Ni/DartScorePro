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

export type Gamemode = "301" | "501" | "rcl" | "cri";

export interface PlayerTotalGameStats {
  sets: number;
  legs: number;
}

export type PlayerToPlayerTotalGameStats = { [player: string]: PlayerTotalGameStats };

export type InAndOutMode = "straight" | "double";

export type MultiplayerMode = "local" | "create" | "join";

export interface GameViewProps {
  currentRound: number;
  players: string[];
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
}

export interface GameViewWithScoreProps extends GameViewProps {
  cbHandleScoreBtnClicked(number: number): void;
  multiplier: number;
  cbHandleMultiplierClicked(multiplier: number): void;
}
