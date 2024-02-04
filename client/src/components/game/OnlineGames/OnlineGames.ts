import { Socket } from "socket.io-client";
import { DGameData } from "../../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface OnlineGamesProps {
  userID: string;
  socket: Socket;
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  initialGameStats: DGameData;
}
