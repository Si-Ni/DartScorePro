import { PlayerScoreCardProps } from "../global/types";

function PlayerScoreCard(props: PlayerScoreCardProps) {
  return (
    <div className="column is-full">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className="title is-5">{props.playerName}</h1>
        <p className="subtitle is-1">{props.score}</p>
        {props.average != null ? (
          <div className="average-box">
            <p className="subtitle is-6">Ø {props.average.toFixed(2)}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PlayerScoreCard;
