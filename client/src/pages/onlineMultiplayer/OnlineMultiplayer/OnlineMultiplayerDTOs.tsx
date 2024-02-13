import { Gamemode, InAndOutMode } from "../../../types/global";
import {
  PlayerToPlayerStats,
  PlayerToPlayerStatsCricket,
  PlayerToPlayerStatsRCl,
  PlayerToPlayerTotalGameStats
} from "../../../types/playerStats";

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
  playerStats: PlayerToPlayerStats | PlayerToPlayerStatsRCl | PlayerToPlayerStatsCricket;
  totalGameStats: PlayerToPlayerTotalGameStats;
  winner: string | null;
}

export interface DSettingsAndGameData {
  gameSettings: DGameSettings | DStandardGameSettings;
  game: DGameData;
}

export interface DPlayer {
  userID: string;
  isLeader: boolean;
  isActive: boolean;
}
