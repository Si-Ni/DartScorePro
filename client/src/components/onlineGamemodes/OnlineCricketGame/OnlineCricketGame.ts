import { PlayerToPlayerStatsCricket } from "../../../types/playerStats.ts";
import { OnlineGameProps } from "../OnlineGameProps";

export interface OnlineCricketGameProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStatsCricket;
}
