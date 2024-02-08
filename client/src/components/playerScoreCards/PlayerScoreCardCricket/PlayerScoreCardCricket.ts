import { CricketStats } from "../../localGamemodes/LocalCricketGame/LocalCricketGame";

export interface PlayerScoreCardCricketProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  cricketStats: CricketStats;
  sets: number;
  legs: number;
}
