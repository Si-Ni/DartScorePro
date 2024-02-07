import { PlayerToPlayerStats } from "../../../types/global";
import { OnlineGameProps } from "../OnlineGameProps";

export interface OnlineStandardGamesProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStats;
}
