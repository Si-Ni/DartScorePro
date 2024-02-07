import {
  Gamemode,
  InAndOutMode,
  PlayerToPlayerStats,
  PlayerToPlayerStatsRCl,
  PlayerToPlayerTotalGameStats
} from "../../../types/global";

export interface DGameSettings {
  selectedGamemode: Gamemode;
  setsToWin: number;
  legsForSet: number;
}

export interface DStandardGameSettings extends DGameSettings {
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
}

export interface DGameData {
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  throwsRemaining: number;
  playerStats: PlayerToPlayerStats | PlayerToPlayerStatsRCl;
  totalGameStats: PlayerToPlayerTotalGameStats;
  winner: string | null;
}

export interface DSettingsAndGameData {
  gameSettings: DGameSettings | DStandardGameSettings;
  game: DGameData;
}
