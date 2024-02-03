import GameInputButtons from "../buttons/GameInputButtons";
import GameMultiplierButtons from "../buttons/GameMultiplierButtons";
import PlayerScoreCard from "../playerScoreCards/PlayerScoreCard";
import { StandardGamesViewProps } from "../../types/StandardGamesView";

function StandardGamesView(props: StandardGamesViewProps) {
  console.log(props);
  return (
    <>
      <div className="is-centered">
        <p className="is-size-3 mb-3" style={{ textAlign: "center" }}>
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
            score={props.playerStats[player].score}
            average={props.playerStats[player].average}
            lastThrows={props.playerStats[player].lastThrows}
            checkoutOptions={props.playerStats[player].checkoutOptions}
            sets={props.playerTotalGameStats[player].sets}
            legs={props.playerTotalGameStats[player].legs}
          />
        ))}
      </div>
      <div className="columns is-centered">
        <div className="column">
          <div className="box">
            {
              <GameInputButtons
                values={[...Array(21).keys()].map((num) => num).concat(25)}
                cbHandleButtonClicked={props.cbHandleScoreBtnClicked}
                showMissButton={false}
                btnSize={20}
              />
            }
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <GameMultiplierButtons
          multiplier={props.multiplier}
          cbHandleMultiplierClicked={props.cbHandleMultiplierClicked}
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
