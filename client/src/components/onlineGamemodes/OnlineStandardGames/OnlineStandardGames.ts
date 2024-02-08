import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import { OnlineGameProps } from "../OnlineGameProps";

export interface OnlineStandardGamesProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStats;
}
