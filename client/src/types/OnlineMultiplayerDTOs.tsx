import { Gamemode, InAndOutMode, PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "./global";

export interface DGameSettings {
  selectedGamemode: Gamemode;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
}

export interface DGameData {
  currentRound: number;
  startingPlayer: number;
  currentPlayer: number;
  throwsRemaining: number;
  playerStats: PlayerToPlayerStats;
  totalGameStats: PlayerToPlayerTotalGameStats;
}

export interface DSettingsAndGameData {
  gameSettings: DGameSettings;
  game: DGameData;
}
