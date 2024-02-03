import { GameViewProps } from "../../../types/global";
import { PlayerToPlayerStatsRCl } from "../../localGamemodes/RoundTheClockGame/RoundTheClockGame";

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}
