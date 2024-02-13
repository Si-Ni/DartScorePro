import { DPlayer } from "../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs.tsx";
import { PlayerToPlayerTotalGameStats } from "../../types/playerStats.ts";

export interface GameViewProps {
  currentRound: number;
  players: string[] | DPlayer[];
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  isPlayersTurn?: boolean;
}

export interface GameViewWithScoreProps extends GameViewProps {
  cbHandleScoreBtnClicked(number: number): void;
  multiplier: number;
  cbHandleMultiplierClicked(multiplier: number): void;
}
