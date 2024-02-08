import { PlayerToPlayerStatsCricket } from "../../localGamemodes/LocalCricketGame/LocalCricketGame";
import { GameViewWithScoreProps } from "../GameView";

export interface CricketGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStatsCricket;
}
