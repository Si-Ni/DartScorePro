import { GamesProps } from "../global/types";
import CricketGame from "./CricketGame";
import RoundTheClockGame from "./RoundTheClockGame";
import StandardGames from "./StandardGames";

function Games(props: GamesProps) {
  return (
    <div>
      {props.selectedGamemode === "301" && (
        <StandardGames gamemodeTotalScore={301} players={props.players} cbReturnToMenu={props.cbReturnToMenu} />
      )}
      {props.selectedGamemode === "501" && (
        <StandardGames gamemodeTotalScore={501} players={props.players} cbReturnToMenu={props.cbReturnToMenu} />
      )}
      {props.selectedGamemode === "rcl" && (
        <RoundTheClockGame players={props.players} cbReturnToMenu={props.cbReturnToMenu} />
      )}
      {props.selectedGamemode === "cri" && (
        <CricketGame players={props.players} cbReturnToMenu={props.cbReturnToMenu} />
      )}
    </div>
  );
}

export default Games;
