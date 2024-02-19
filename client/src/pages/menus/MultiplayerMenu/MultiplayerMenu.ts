import { MultiplayerMode } from "../../../types/global";

export interface MultiplayerModeProps {
  isLoggedIn: boolean;
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}
