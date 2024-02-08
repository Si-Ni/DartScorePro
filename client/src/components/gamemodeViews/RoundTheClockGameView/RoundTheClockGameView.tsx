import PlayerScoreCard from "../../playerScoreCards/PlayerScoreCard/PlayerScoreCard.tsx";
import { RoundTheClockGameViewProps } from "./RoundTheClockGameView";

function RoundTheClockGameView(props: RoundTheClockGameViewProps) {
  return (
    <>
      <div className="is-centered">
        <p className="is-size-3 mb-6" style={{ textAlign: "center" }}>
          Round: {props.currentRound}
        </p>
      </div>
      <div className="columns is-centered playerCardsContainer">
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
        <button
          className="button is-success m-1 is-size-5 uniformButton"
          onClick={props.cbHandleHitClicked}
          disabled={props.isPlayersTurn === false}
        >
          Hit
        </button>
        <button
          className="button is-danger m-1 is-size-5 uniformButton"
          onClick={props.cbHandleMissClicked}
          disabled={props.isPlayersTurn === false}
        >
          Miss
        </button>
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <button
            className="button is-warning m-1 is-size-5"
            style={{ width: "150px" }}
            onClick={props.cbHandleNextClicked}
            disabled={props.isPlayersTurn === false}
          >
            Skip Turn
          </button>
        </div>
      </div>
    </>
  );
}

export default RoundTheClockGameView;
