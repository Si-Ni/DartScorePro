import { DGameData } from "../../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface OnlineGamesProps {
  userID: string;
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  initialGameStats: DGameData;
}
