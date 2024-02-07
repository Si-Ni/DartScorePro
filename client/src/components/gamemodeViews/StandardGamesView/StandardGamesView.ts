import { PlayerToPlayerStats } from "../../../types/global";
import { GameViewWithScoreProps } from "../GameView";

export interface StandardGamesViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;
  isPlayersTurn?: boolean;
}
