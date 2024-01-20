import React from "react";
import { Round } from "../helpers/calcCheckouts";

export interface LoginProps {
  pwdRef: React.RefObject<HTMLInputElement>;
  loginErrorMsg: string;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayUserID: React.Dispatch<React.SetStateAction<string>>;

  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export interface RegisterProps {
  pwdRef: React.RefObject<HTMLInputElement>;
  loginErrorMsg: string;

  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export interface PlayerStats {
  score: number;
  scoreAtBeginningOfRound: number;
  average: number;
  dartsThrown: number;
  totalScore: number;
  turns: number;
  lastThrows: string[];
  throwsRemaining: number;
  checkoutOptions: Round[];
}

export type PlayerToPlayerStats = { [player: string]: PlayerStats };

export interface PlayerStatsRCl {
  currentTarget: number;
  lastThrows: string[];
}

export type PlayerToPlayerStatsRCl = { [player: string]: PlayerStatsRCl };

export interface StandardGamesProps {
  gamemodeTotalScore: number;
  players: string[];
  cbReturnToMenu(): void;
}

export interface RoundTheClockGameProps {
  players: string[];
  cbReturnToMenu(): void;
}

export interface GameInputButtonsProps {
  values: number[];
  cbHandleButtonClicked(number: number): void;
  showMissButton: boolean;
  btnSize: number;
}

export interface CricketGameProps {
  players: string[];
  cbReturnToMenu(): void;
}

export type Gamemode = "301" | "501" | "rcl" | "cri";

export interface PlayerScoreCardProps {
  playerName: string;
  isCurrentPlayer: boolean;
  score: number;
  average?: number;
  lastThrows: string[];
  checkoutOptions?: Round[];
}

// 4 = closed for all players
export type CricketStatus = 0 | 1 | 2 | 3 | 4;

export interface CricketStats {
  20: CricketStatus;
  19: CricketStatus;
  18: CricketStatus;
  17: CricketStatus;
  16: CricketStatus;
  15: CricketStatus;
  Bull: CricketStatus;
  [key: string]: CricketStatus;
}

export interface PlayerScoreCardCricketProps {
  playerName: string;
  isCurrentPlayer: boolean;
  score: number;
  cricketStats: CricketStats;
}

export interface PlayerStatsCricket {
  score: number;
  cricketStats: CricketStats;
}

export type PlayerToPlayerStatsCricket = { [player: string]: PlayerStatsCricket };

export interface PlayerScoreCardProps {
  playerName: string;
  isCurrentPlayer: boolean;
  score: number;
}

export interface YesNoPopUpProps {
  content: string;
  cbYesClicked(): void;
  cbNoClicked(): void;
}

export interface GamemodeMenuProps {
  cbGamemodeSelected(gamemode: Gamemode): void;
}

export type MultiplayerMode = "local" | "create" | "join";

export interface MultiplayerModeProps {
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}

export interface GamesProps {
  selectedGamemode: Gamemode;
  players: string[];
  cbReturnToMenu(): void;
}

export interface LocalMultiplayerMenuProps {
  cbBackToMenu(): void;
}
