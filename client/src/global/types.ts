import React from "react";

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

export type Gamemode = "301" | "501" | "rcl" | "cri";

export interface PlayerScoreCardProps {
  playerName: string;
  isCurrentPlayer: boolean;
  score: number;
  average?: number;
  lastThrows: string[];
}

export interface YesNoPopUpProps {
  content: string;
  cbYesClicked(): void;
  cbNoClicked(): void;
}

export interface GamemodeMenuProps {
  cbGamemodeSelected(gamemode: Gamemode): void;
}
