import { PlayerToPlayerStatsRCl } from "../../../types/playerStats.ts";
import { GameViewProps } from "../GameView";

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  isPlayersTurn?: boolean;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}
