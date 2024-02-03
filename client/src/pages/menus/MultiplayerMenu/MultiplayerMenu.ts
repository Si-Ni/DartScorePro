import { MultiplayerMode } from "../../../types/global";

export interface MultiplayerModeProps {
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}
