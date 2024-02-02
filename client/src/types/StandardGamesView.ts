import { GameViewWithScoreProps, PlayerToPlayerStats } from "./global";

export interface StandardGamesViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;
}
