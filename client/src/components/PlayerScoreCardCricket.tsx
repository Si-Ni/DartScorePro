import { PlayerScoreCardCricketProps } from "../global/types";

function PlayerScoreCardCricket(props: PlayerScoreCardCricketProps) {
  const tableHeaders: string[] = Object.keys(props.cricketStats);

  return (
    <div className="column is-full playerCardMinWidth">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className="title is-5">{props.playerName}</h1>
        <table className="table">
          <thead>
            <tr>
              {tableHeaders.map((header: string) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <p className="subtitle is-1">{props.score}</p>
      </div>
    </div>
  );
}

export default PlayerScoreCardCricket;
