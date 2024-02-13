import { Socket } from "socket.io-client";
import { DGameData, DPlayer } from "../../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs";
import { Gamemode, InAndOutMode } from "../../../types/global";

export interface OnlineGamesProps {
  displayUserID: string;
  socket: Socket;
  lobbyCode: string;
  selectedGamemode: Gamemode;
  players: DPlayer[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  initialGameStats: DGameData;
}
