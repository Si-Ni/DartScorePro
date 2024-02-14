import { DPlayer } from "../../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs.tsx";
import GameInputButtons from "../../buttons/GameInputButtons/GameInputButtons.tsx";
import GameMultiplierButtons from "../../buttons/GameMultiplierButtons/GameMultiplierButtons.tsx";
import PlayerScoreCardCricket from "../../playerScoreCards/PlayerScoreCardCricket/PlayerScoreCardCricket.tsx";
import { CricketGameViewProps } from "./CricketGameView";

function CricketGameView(props: CricketGameViewProps) {
  const renderPlayerScoreCard = (player: string | DPlayer) => {
    const { userID, isActive } = typeof player === "string" ? { userID: player, isActive: true } : player;
    const isStartingPlayer = props.players[props.startingPlayerIndex] === player;
    const isCurrentPlayer = props.players[props.currentPlayerIndex] === player;

    return (
      <PlayerScoreCardCricket
        key={userID}
        playerName={userID}
        isStartingPlayer={isStartingPlayer}
        isCurrentPlayer={isCurrentPlayer}
        score={props.playerStats[userID].score}
        cricketStats={props.playerStats[userID].cricketStats}
        sets={props.playerTotalGameStats[userID].sets}
        legs={props.playerTotalGameStats[userID].legs}
        disabled={!isActive}
      />
    );
  };

  return (
    <>
      <div className="is-centered roundsInfo">
        <p className="is-size-3 mb-3" style={{ textAlign: "center" }}>
          Round: {props.currentRound}
        </p>
      </div>
      <div className="columns is-centered playerCardsContainerCricket">
        {props.players.map((player) => renderPlayerScoreCard(player))}
      </div>
      <div className="columns is-centered">
        <div className="column">
          {
            <GameInputButtons
              values={[...Array(6).keys()].map((num) => 20 - num).concat(25)}
              cbHandleButtonClicked={props.cbHandleScoreBtnClicked}
              showMissButton={true}
              btnSize={60}
              disabled={props.isPlayersTurn === false}
            />
          }
        </div>
      </div>
      <div className="columns is-centered">
        <GameMultiplierButtons
          multiplier={props.multiplier}
          cbHandleMultiplierClicked={props.cbHandleMultiplierClicked}
          disabled={props.isPlayersTurn === false}
        />
      </div>
    </>
  );
}

export default CricketGameView;
