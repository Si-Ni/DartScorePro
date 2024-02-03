import { GameViewWithScoreProps } from "../../../types/global";
import { PlayerToPlayerStatsCricket } from "../../localGamemodes/CricketGame/CricketGame";

export interface CricketGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStatsCricket;
}
