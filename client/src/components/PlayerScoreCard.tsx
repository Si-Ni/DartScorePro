import { PlayerScoreCardProps } from "../global/types";
import "../styles/Games.css";
import { stringifyRound } from "../helpers/calcCheckouts";

function PlayerScoreCard(props: PlayerScoreCardProps) {
  return (
    <div className="column is-full playerCardMinWidth">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className="title is-5">{props.playerName}</h1>
        <p className="subtitle is-1">{props.score}</p>
        <div className="columns ml-0" style={{ minHeight: "24px", display: "block" }}>
          {props.lastThrows.map((lastThrow, index) => (
            <div key={index} className="column pt-0 pb-0 pl-0 pr-2" style={{ display: "inline-block" }}>
              <p className="is-size-6">{lastThrow}</p>
            </div>
          ))}
        </div>
        {props.average != null && (
          <div className="average-box">
            <p className="subtitle is-6">Ø {props.average.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerScoreCard;
