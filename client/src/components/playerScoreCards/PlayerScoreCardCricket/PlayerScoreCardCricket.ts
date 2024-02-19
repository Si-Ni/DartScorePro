import { CricketStats } from "../../../types/playerStats";

export interface PlayerScoreCardCricketProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  cricketStats: CricketStats;
  sets: number;
  legs: number;
  disabled?: boolean;
}
