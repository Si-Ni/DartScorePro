import { GameViewProps, PlayerToPlayerStatsRCl } from "../../../types/global";

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  isPlayersTurn?: boolean;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}
