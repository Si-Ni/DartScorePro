import { Round } from "../../../helpers/calcCheckouts";
import { InAndOutMode } from "../../../types/global";

export interface PlayerScoreCardProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  average?: number;
  lastThrows: string[];
  checkoutOptions?: Round[];
  sets: number;
  legs: number;
  isLoggedIn: boolean;
  modeOut?: InAndOutMode;
  disabled?: boolean;
}
