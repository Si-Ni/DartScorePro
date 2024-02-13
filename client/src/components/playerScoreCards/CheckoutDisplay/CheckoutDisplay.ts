import { InAndOutMode } from "../../../types/global";

export interface CheckoutDisplayProps {
  playerName: string;
  score: number;
  modeOut: InAndOutMode;
}

export interface Checkout {
  checkout: number[];
  timesPlayed: number;
}
