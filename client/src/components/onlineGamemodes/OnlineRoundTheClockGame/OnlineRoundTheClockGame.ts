import { PlayerToPlayerStatsRCl } from "../../../types/playerStats.ts";
import { OnlineGameProps } from "../OnlineGameProps";

export interface OnlineRoundTheClockGameProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStatsRCl;
}
