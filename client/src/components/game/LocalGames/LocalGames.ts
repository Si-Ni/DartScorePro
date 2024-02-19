import { GameType, Gamemode, InAndOutMode } from "../../../types/global";

export interface LocalGamesProps {
  isLoggedIn: boolean;
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  gameType: GameType;
  cbPlayerWon?(player: string): void;
}
