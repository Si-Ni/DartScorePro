import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import { GameViewWithScoreProps } from "../GameView";

export interface StandardGamesViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;
}
