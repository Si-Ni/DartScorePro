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

export interface LocalStandardGamesProps {
  gamemodeTotalScore: number;
  players: string[];
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  throwsRemaining: number;
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  switchToNextPlayer(): void;
  updateRemainingThrows(): void;
  setThrowsRemaining: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface RoundTheClockGameProps {
  players: string[];
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  setsToWin: number;
  legsForSet: number;
  throwsRemaining: number;
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  switchToNextPlayer(): void;
  updateRemainingThrows(): void;
}

export interface GameInputButtonsProps {
  values: number[];
  cbHandleButtonClicked(number: number): void;
  showMissButton: boolean;
  btnSize: number;
}

export interface CricketGameProps {
  players: string[];
  cbPlayerHasWon(playerKey: string): void;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  setsToWin: number;
  legsForSet: number;
  throwsRemaining: number;
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  switchToNextPlayer(): void;
  updateRemainingThrows(): void;
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
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  cricketStats: CricketStats;
  sets: number;
  legs: number;
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

export type InAndOutMode = "straight" | "double";

export interface GameSettingsProps {
  selectedGamemode: Gamemode;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export type MultiplayerMode = "local" | "create" | "join";

export interface MultiplayerModeProps {
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}

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

export interface PlayerMenuProps {
  players: string[];
  maxPlayers: number;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  isEditable: boolean;
}

export interface PlayersAndSettingsProps {
  players: string[];
  maxPlayers: number;
  validNumberOfPlayers: boolean;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
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

export interface OnlineMultiplayerSettingsProps {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  socket: Socket;
  lobbyCode: string;
  isLobbyLeader: boolean;
  setsToWin: number;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  cbNextBtnClicked(): void;
  displayUserID: string;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OnlineMultiplayerProps {
  cbBackBtnClicked(): void;
  displayUserID: string;
  socket: Socket;
  lobbyCode: string;
  isLobbyLeader: boolean;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MultiplayerProps {
  socket: Socket;
  setLobbyCode: React.Dispatch<React.SetStateAction<string>>;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
  displayUserID: string;
}

export interface CreateLobbyProps {
  cbBackBtnClicked(): void;
  socket: Socket;
  setLobbyCodeGlobal: React.Dispatch<React.SetStateAction<string>>;
  setIsLobbyLeader: React.Dispatch<React.SetStateAction<boolean>>;
  displayUserID: string;
}

export interface JoinLobbyProps {
  cbBackBtnClicked(): void;
  socket: Socket;
  setLobbyCodeGlobal: React.Dispatch<React.SetStateAction<string>>;
  displayUserID: string;
}

export interface SettingsMenuProps {
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  cbBackBtnClicked(): void;
  cbNextBtnClicked(): void;
}

export interface NavigationButtonsProps {
  cbBackBtnClicked?(): void;
  cbNextBtnClicked?(): void;
  contentBackBtn?: string;
  contentNextBtn?: string;
  nextBtnDisabled?: boolean;
  marginTop?: number;
  showNextBtn?: boolean;
}

export interface GameMultiplierButtonsProps {
  cbHandleMultiplierClicked(multiplier: number): void;
  multiplier: number;
}

interface GameViewProps {
  currentRound: number;
  players: string[];
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
}

interface GameViewWithScoreProps extends GameViewProps {
  cbHandleScoreBtnClicked(number: number): void;
  multiplier: number;
  cbHandleMultiplierClicked(multiplier: number): void;
}

export interface StandardGamesViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;
}

export interface RoundTheClockGameViewProps extends GameViewProps {
  playerStats: PlayerToPlayerStatsRCl;
  cbHandleHitClicked(): void;
  cbHandleMissClicked(): void;
  cbHandleNextClicked(): void;
}

export interface CricketGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStatsCricket;
}

export interface GameInformationHeaderProps {
  throwsRemaining: number;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
}

export interface OnlineGamesProps {
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
}

export interface OnlineStandardGamesProps {
  currentRound: number;
  players: string[];
  multiplier: number;
}

export interface DGameSettings {
  selectedGamemode: Gamemode;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
}
