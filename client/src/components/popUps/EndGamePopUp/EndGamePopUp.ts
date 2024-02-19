import { Gamemode, GameType } from "../../../types/global";
import { PlayerTotalGameStats } from "../../../types/playerStats";

export interface EndGamePopUpProps {
  winnerName: string;
  cbBtnClicked(): void;
  gameType: GameType;
  gamemode: Gamemode;
  totalGameStats?: PlayerTotalGameStats;
}
