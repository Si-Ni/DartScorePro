import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import { OnlineGameProps } from "../OnlineGameProps";
import { InAndOutMode } from "../../../types/global";

export interface OnlineStandardGamesProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStats;
  modeOut: InAndOutMode;
}
