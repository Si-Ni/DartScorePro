import RoundTheClockGameView from "../../gamemodeViews/RoundTheClockGameView/RoundTheClockGameView.tsx";
import { OnlineRoundTheClockGameProps } from "./OnlineRoundTheClockGame";

function OnlineRoundTheClockGame(props: OnlineRoundTheClockGameProps) {
  const handleScoreBtnClicked = (points: number) => {
    if (!props.isPlayersTurn) return;

    props.socket.emit("game:sendThrownPoints", { lobbyCode: props.lobbyCode, points: points });
  };

  return (
    <RoundTheClockGameView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.currentPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      isPlayersTurn={props.isPlayersTurn}
      cbHandleHitClicked={() => {}}
      cbHandleMissClicked={() => {}}
      cbHandleNextClicked={() => {}}
    />
  );
}

export default OnlineRoundTheClockGame;
