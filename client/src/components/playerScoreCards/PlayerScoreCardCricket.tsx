import "../../styles/CricketSymbols.css";
import { PlayerScoreCardCricketProps } from "../../types/PlayerScoreCardCricket";
import { CricketStatus } from "../../types/CricketGame";

const sortTableHeaders = (tableHeaders: string[]) => {
  tableHeaders.sort((a, b) => {
    const sortOrder = (key: string) => (key === "Bull" ? -1 : parseInt(key, 10));
    return sortOrder(b) - sortOrder(a);
  });
};

function PlayerScoreCardCricket(props: PlayerScoreCardCricketProps) {
  const tableHeaders: string[] = Object.keys(props.cricketStats);
  sortTableHeaders(tableHeaders);

  const symbolClassNames = {
    0: "",
    1: "slash",
    2: "x",
    3: "x circle",
    4: "closedAll"
  };

  const formatCricketScoreToSymbolClass = (cricketStatus: CricketStatus): string => {
    let className = `cell ${symbolClassNames[cricketStatus]}`;
    return className;
  };

  return (
    <div className="column playerCardMinWidth">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className={`title is-5 ${props.isStartingPlayer && "red-dot"}`}>{props.playerName}</h1>
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
          <p className="subtitle is-2 mb-3">Score: {props.score}</p>
        </div>
        <div className="columns is-centered mb-1">
          <table className="table is-bordered mt-3">
            <tbody>
              <tr>
                <th>Sets:</th>
                <td> {props.sets}</td>
                <th>Legs:</th>
                <td> {props.legs}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PlayerScoreCardCricket;
