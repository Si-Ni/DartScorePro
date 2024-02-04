import StandardGamesView from "../../gamemodeViews/StandardGamesView/StandardGamesView.tsx";
import { OnlineStandardGamesProps } from "./OnlineStandardGames";
import { useState } from "react";

function OnlineStandardGames(props: OnlineStandardGamesProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleScoreBtnClicked = (points: number) => {
    if (!props.isPlayersTurn || (multiplier === 3 && points === 25)) return;

    props.socket.emit("game:sendThrownPoints", { multiplier: multiplier, points: points });
  };

  return (
    <StandardGamesView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.currentPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      cbHandleScoreBtnClicked={handleScoreBtnClicked}
      multiplier={multiplier}
      cbHandleMultiplierClicked={setMultiplier}
      isPlayersTurn={props.isPlayersTurn}
    />
  );
}

export default OnlineStandardGames;
