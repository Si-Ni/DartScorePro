import { GameViewWithScoreProps, PlayerToPlayerStats } from "../../../types/global";

export interface StandardGamesViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;
}
