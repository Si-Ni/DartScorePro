import { Socket } from "socket.io-client";
import { PlayerToPlayerTotalGameStats } from "../../types/playerStats";
import { DPlayer } from "../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs";

export interface OnlineGameProps {
  isLoggedIn: boolean;
  socket: Socket;
  lobbyCode: string;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  currentRound: number;
  players: DPlayer[];
  throwsRemaining: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  isPlayersTurn: boolean;
}
