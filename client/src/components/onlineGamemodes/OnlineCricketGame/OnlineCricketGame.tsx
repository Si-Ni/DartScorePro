import { useState } from "react";
import CricketGameView from "../../gamemodeViews/CricketGameView/CricketGameView.tsx";
import { OnlineCricketGameProps } from "./OnlineCricketGame.ts";

function OnlineCricketGame(props: OnlineCricketGameProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleScoreBtnClicked = (points: number) => {
    if (!props.isPlayersTurn || (multiplier === 3 && points === 25)) return;

    props.socket.emit("game:sendGameInputFromPlayer", {
      lobbyCode: props.lobbyCode,
      multiplier: multiplier,
      points: points
    });
  };

  return (
    <CricketGameView
      isLoggedIn={props.isLoggedIn}
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.startingPlayerIndex}
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

export default OnlineCricketGame;
