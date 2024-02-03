import { DGameData } from "../../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface OnlineGamesProps {
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  initialGameStats: DGameData;
}
