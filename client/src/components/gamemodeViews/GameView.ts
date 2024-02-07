import { PlayerToPlayerTotalGameStats } from "../../types/global";

export interface GameViewProps {
  currentRound: number;
  players: string[];
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
}

export interface GameViewWithScoreProps extends GameViewProps {
  cbHandleScoreBtnClicked(number: number): void;
  multiplier: number;
  cbHandleMultiplierClicked(multiplier: number): void;
}
