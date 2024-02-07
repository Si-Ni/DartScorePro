import { PlayerToPlayerStatsRCl } from "../../../types/global";
import { OnlineGameProps } from "../OnlineGameProps";

export interface OnlineRoundTheClockGameProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStatsRCl;
}
