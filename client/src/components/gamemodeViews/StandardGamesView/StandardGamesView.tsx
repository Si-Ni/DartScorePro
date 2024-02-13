import GameInputButtons from "../../buttons/GameInputButtons/GameInputButtons.tsx";
import GameMultiplierButtons from "../../buttons/GameMultiplierButtons/GameMultiplierButtons.tsx";
import PlayerScoreCard from "../../playerScoreCards/PlayerScoreCard/PlayerScoreCard.tsx";
import { StandardGamesViewProps } from "./StandardGamesView";

function StandardGamesView(props: StandardGamesViewProps) {
  return (
    <>
      <div className="is-centered roundsInfo roundsInfo">
        <p className="is-size-3 mb-1" style={{ textAlign: "center" }}>
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
            score={props.playerStats[player].score}
            average={props.playerStats[player].average}
            lastThrows={props.playerStats[player].lastThrows}
            checkoutOptions={props.playerStats[player].checkoutOptions}
            sets={props.playerTotalGameStats[player].sets}
            legs={props.playerTotalGameStats[player].legs}
            modeOut={props.modeOut}
          />
        ))}
      </div>
      <div className="columns is-centered">
        <div className="column">
          {
            <GameInputButtons
              values={[...Array(21).keys()].map((num) => num).concat(25)}
              cbHandleButtonClicked={props.cbHandleScoreBtnClicked}
              showMissButton={false}
              btnSize={20}
              disabled={props.isPlayersTurn === false}
            />
          }
        </div>
      </div>
      <div className="columns is-flex is-centered">
        <GameMultiplierButtons
          multiplier={props.multiplier}
          cbHandleMultiplierClicked={props.cbHandleMultiplierClicked}
          disabled={props.isPlayersTurn === false}
        />
        {props.cbHandleUndoClicked && (
          <button className="button is-danger m-1 is-size-5 uniformButton" onClick={props.cbHandleUndoClicked}>
            Undo
          </button>
        )}
      </div>
    </>
  );
}

export default StandardGamesView;
