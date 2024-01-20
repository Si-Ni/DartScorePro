import { CricketStatus, PlayerScoreCardCricketProps } from "../global/types";
import "../styles/CricketSymbols.css";

const sortTableHeaders = (tableHeaders: string[]) => {
  tableHeaders.sort((a, b) => {
    const sortOrder = (key: string) => (key === "Bull" ? -1 : parseInt(key, 10));
    return sortOrder(b) - sortOrder(a);
  });
};

function PlayerScoreCardCricket(props: PlayerScoreCardCricketProps) {
  const tableHeaders: string[] = Object.keys(props.cricketStats);
  sortTableHeaders(tableHeaders);

  const formatCricketScoreToSymbolClass = (cricketStatus: CricketStatus): string => {
    let className = "cell";
    switch (cricketStatus) {
      case 0:
        className += "";
        break;
      case 1:
        className += " slash";
        break;
      case 2:
        className += " x";
        break;
      case 3:
        className += " x circle";
        break;
      case 4:
        className += " closedAll";
        break;
    }
    return className;
  };

  return (
    <div className="column playerCardMinWidth">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className="title is-5">{props.playerName}</h1>
        <table className="table is-bordered">
          <thead>
            <tr>
              {tableHeaders.map((header: string) => (
                <th key={header} style={{ width: "55px" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableHeaders.map((header: string) => (
                <td className="" key={header}>
                  <div className={formatCricketScoreToSymbolClass(props.cricketStats[header])} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="columns is-centered mb-1">
          <p className="subtitle is-2">Score: {props.score}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerScoreCardCricket;
