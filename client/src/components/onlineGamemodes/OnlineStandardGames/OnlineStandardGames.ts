import { PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "../../../types/global";

export interface OnlineStandardGamesProps {
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  playerStats: PlayerToPlayerStats;
  currentRound: number;
  players: string[];
  throwsRemaining: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  isPlayersTurn: boolean;
}
