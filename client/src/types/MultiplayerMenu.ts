import { MultiplayerMode } from "./global";

export interface MultiplayerModeProps {
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}
