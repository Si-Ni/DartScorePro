import { CricketStats } from "../../localGamemodes/CricketGame/CricketGame";

export interface PlayerScoreCardCricketProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  cricketStats: CricketStats;
  sets: number;
  legs: number;
}
