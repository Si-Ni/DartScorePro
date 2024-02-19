import RoundTheClockGameView from "../../gamemodeViews/RoundTheClockGameView/RoundTheClockGameView.tsx";
import { OnlineRoundTheClockGameProps } from "./OnlineRoundTheClockGame";

function OnlineRoundTheClockGame(props: OnlineRoundTheClockGameProps) {
  const handleHitClicked = () => {
    if (!props.isPlayersTurn) return;
    props.socket.emit("game:sendGameInputFromPlayer", { lobbyCode: props.lobbyCode, isHitted: true });
  };
  const handleMissClicked = () => {
    if (!props.isPlayersTurn) return;
    props.socket.emit("game:sendGameInputFromPlayer", { lobbyCode: props.lobbyCode, isHitted: false });
  };
  const handleSkipClicked = () => {
    if (!props.isPlayersTurn) return;
    props.socket.emit("game:sendGameInputFromPlayer", { lobbyCode: props.lobbyCode, skip: true });
  };

  return (
    <RoundTheClockGameView
      isLoggedIn={props.isLoggedIn}
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      isPlayersTurn={props.isPlayersTurn}
      cbHandleHitClicked={handleHitClicked}
      cbHandleMissClicked={handleMissClicked}
      cbHandleNextClicked={handleSkipClicked}
    />
  );
}

export default OnlineRoundTheClockGame;
