import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import { GameViewWithScoreProps } from "../GameView";
import { InAndOutMode } from "../../../types/global";

export interface StandardGamesViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;

  modeOut: InAndOutMode;
}
