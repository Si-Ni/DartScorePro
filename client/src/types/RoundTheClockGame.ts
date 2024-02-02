import { GameViewProps, PlayerToPlayerTotalGameStats } from "./global";

export interface PlayerStatsRCl {
  currentTarget: number;
  lastThrows: string[];
}

export type PlayerToPlayerStatsRCl = { [player: string]: PlayerStatsRCl };

export interface RoundTheClockGameProps {
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

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}
