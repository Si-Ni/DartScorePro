import { PlayerToPlayerStatsCricket } from "../../../types/playerStats.ts";
import { GameViewWithScoreProps } from "../GameView";

export interface CricketGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStatsCricket;
}
