import { PlayerToPlayerStatsRCl } from "../../../types/global";
import { GameViewProps } from "../GameView";

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  isPlayersTurn?: boolean;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}
