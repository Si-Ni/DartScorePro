import { PlayerToPlayerStatsCricket } from "../../localGamemodes/CricketGame/CricketGame";
import { GameViewWithScoreProps } from "../GameView";

export interface CricketGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStatsCricket;
}
