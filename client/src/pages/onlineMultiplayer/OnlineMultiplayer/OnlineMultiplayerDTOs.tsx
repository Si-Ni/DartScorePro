import { Gamemode, InAndOutMode, PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "../../../types/global";

export interface DGameSettings {
  selectedGamemode: Gamemode;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
}

export interface DGameData {
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  throwsRemaining: number;
  playerStats: PlayerToPlayerStats;
  totalGameStats: PlayerToPlayerTotalGameStats;
  winner: string | null;
}

export interface DSettingsAndGameData {
  gameSettings: DGameSettings;
  game: DGameData;
}
