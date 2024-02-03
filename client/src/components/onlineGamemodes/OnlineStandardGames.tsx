import StandardGamesView from "../gamemodeViews/StandardGamesView";
import { OnlineStandardGamesProps } from "../../types/OnlineStandardGames";
import { useState } from "react";

function OnlineStandardGames(props: OnlineStandardGamesProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  return (
    <StandardGamesView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.currentPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      cbHandleScoreBtnClicked={() => {}}
      multiplier={multiplier}
      cbHandleMultiplierClicked={setMultiplier}
    />
  );
}

export default OnlineStandardGames;
