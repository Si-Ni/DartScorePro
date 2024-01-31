import { RoundTheClockGameViewProps } from "../../global/types";
import PlayerScoreCard from "../playerScoreCards/PlayerScoreCard";

function RoundTheClockGameView(props: RoundTheClockGameViewProps) {
  return (
    <>
      <div className="is-centered">
        <p className="is-size-3 mb-6" style={{ textAlign: "center" }}>
          Round: {props.currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {props.players.map((player) => (
          <PlayerScoreCard
            key={player}
            playerName={player}
            isStartingPlayer={props.players[props.startingPlayerIndex] === player}
            isCurrentPlayer={props.players[props.currentPlayerIndex] === player}
            score={props.playerStats[player].currentTarget}
            lastThrows={props.playerStats[player].lastThrows}
            sets={props.playerTotalGameStats[player].sets}
            legs={props.playerTotalGameStats[player].legs}
          />
        ))}
      </div>
      <div className="columns is-centered mt-6">
        <button className="button is-success m-1 is-size-5 uniformButton" onClick={props.cbHandleHitClicked}>
          Hit
        </button>
        <button className="button is-danger m-1 is-size-5 uniformButton" onClick={props.cbHandleMissClicked}>
          Miss
        </button>
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <button
            className="button is-warning m-1 is-size-5"
            style={{ width: "150px" }}
            onClick={props.cbHandleNextClicked}
          >
            Skip Player
          </button>
        </div>
      </div>
    </>
  );
}

export default RoundTheClockGameView;
