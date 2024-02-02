import { Gamemode, InAndOutMode } from "./global";

export interface LocalGamesProps {
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  cbPlayerWon?(player: string): void;
}
