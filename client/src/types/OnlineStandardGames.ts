import { PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "./global";

export interface OnlineStandardGamesProps {
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  playerStats: PlayerToPlayerStats;
  currentRound: number;
  players: string[];
  throwsRemaining: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
}
