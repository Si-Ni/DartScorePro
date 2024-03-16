import { InAndOutMode } from "../../types/global";

export interface GameInformationHeaderProps {
  throwsRemaining: number;
  setsToWin: number;
  legsForSet: number;
  modeIn?: InAndOutMode;
  modeOut?: InAndOutMode;
}
