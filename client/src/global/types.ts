import React from "react";
import { Round } from "../helpers/calcCheckouts";
import { Socket } from "socket.io-client";

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
  cbBackBtnClicked(): void;
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  winningPlayer: string | null;
  setsToWin: number;
  legsForSet: number;
}

export interface RoundTheClockGameProps {
  players: string[];
  cbBackBtnClicked(): void;
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  winningPlayer: string | null;
  setsToWin: number;
  legsForSet: number;
}

export interface GameInputButtonsProps {
  values: number[];
  cbHandleButtonClicked(number: number): void;
  showMissButton: boolean;
  btnSize: number;
}

export interface CricketGameProps {
  players: string[];
  cbBackBtnClicked(): void;
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  winningPlayer: string | null;
  setsToWin: number;
  legsForSet: number;
}

export type Gamemode = "301" | "501" | "rcl" | "cri";

export interface PlayerScoreCardProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  average?: number;
  lastThrows: string[];
  checkoutOptions?: Round[];
  sets: number;
  legs: number;
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

export interface PlayerTotalGameStats {
  sets: number;
  legs: number;
}

export type PlayerToPlayerTotalGameStats = { [player: string]: PlayerTotalGameStats };

export interface YesNoPopUpProps {
  content: string;
  cbYesClicked(): void;
  cbNoClicked(): void;
}

export interface PopUpProps {
  content: string;
  btnContent: string;
  cbBtnClicked(): void;
}

export interface GamemodeSelectionProps {
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
}

export interface GameSettingsProps {
  selectedGamemode: Gamemode;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export type MultiplayerMode = "local" | "create" | "join";

export interface MultiplayerModeProps {
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}

export interface GamesProps {
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
}

export interface PlayerMenuProps {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  isEditable: boolean;
}

export interface LocalMultiplayerMenuProps {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  handleSettingsNextBtnClicked(): void;
  cbBackBtnClicked(): void;
}

export interface LocalMultiplayerProps {
  cbBackBtnClicked(): void;
}

export interface MainMenuProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayUserID: React.Dispatch<React.SetStateAction<string>>;
}

export interface OnlineMultiplayerMenuProps {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  socket: Socket;
  lobbyCode: string;
  isLobbyLeader: boolean;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  cbNextBtnClicked(): void;
}

export interface OnlineMultiplayerProps {
  cbBackBtnClicked(): void;
  displayUserID: string;
  socket: Socket;
  lobbyCode: string;
  isLobbyLeader: boolean;
}

export interface MultiplayerProps {
  socket: Socket;
  setLobbyCode: React.Dispatch<React.SetStateAction<string>>;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateLobbyProps {
  cbBackBtnClicked(): void;
  socket: Socket;
  setLobbyCodeGlobal: React.Dispatch<React.SetStateAction<string>>;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface JoinLobbyProps {
  cbBackBtnClicked(): void;
  socket: Socket;
  setLobbyCodeGlobal: React.Dispatch<React.SetStateAction<string>>;
}

export interface SettingsMenuProps {
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  cbBackBtnClicked(): void;
  cbNextBtnClicked(): void;
}
