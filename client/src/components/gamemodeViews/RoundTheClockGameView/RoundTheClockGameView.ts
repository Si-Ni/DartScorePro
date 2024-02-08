import { PlayerToPlayerStatsRCl } from "../../../types/playerStats.ts";
import { GameViewProps } from "../GameView";

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}
