import { GamesProps } from "../global/types";
import StandardGamesMultiplayer from "./StandardGames";

function GamesMultiplayer(props: GamesProps) {
  return (
    <div>
      {props.selectedGamemode === "301" && (
        <StandardGamesMultiplayer
          gamemodeTotalScore={301}
          players={props.players}
          cbBackBtnClicked={props.cbBackBtnClicked}
        />
      )}
    </div>
  );
}

export default GamesMultiplayer;
