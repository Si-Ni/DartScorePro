import { Socket } from "socket.io-client";
import { PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "../../../types/global";

export interface OnlineStandardGamesProps {
  socket: Socket;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  playerStats: PlayerToPlayerStats;
  currentRound: number;
  players: string[];
  throwsRemaining: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  isPlayersTurn: boolean;
}
