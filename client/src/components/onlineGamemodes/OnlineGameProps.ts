import { Socket } from "socket.io-client";
import { PlayerToPlayerTotalGameStats } from "../../types/global";

export interface OnlineGameProps {
  socket: Socket;
  lobbyCode: string;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  currentRound: number;
  players: string[];
  throwsRemaining: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  isPlayersTurn: boolean;
}
