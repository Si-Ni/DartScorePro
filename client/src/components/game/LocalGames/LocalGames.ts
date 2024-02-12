import { GameType, Gamemode, InAndOutMode } from "../../../types/global";

export interface LocalGamesProps {
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
