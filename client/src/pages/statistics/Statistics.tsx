import "../../styles/Menu.css";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const STATISTICS_URL = "/api/userStats";

function Statistics() {
  const [statistics, setStatistics] = useState<any>({});

  useEffect(() => {
    axios
      .get(STATISTICS_URL, { withCredentials: true })
      .then((response) => {
        setStatistics(response.data);
      })
      .catch(() => {});
  }, []);

  const calculateWinRate = (wins: number, defeats: number) =>
    wins + defeats === 0 ? 0 : defeats === 0 ? 100 : Number(((wins / (wins + defeats)) * 100).toFixed(2));

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="table-container">
          <table className="table is-bordered is-hoverable">
            <thead>
              <tr>
                <th>Game Mode</th>
                <th>Statistic (total)</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={7}>Standard (301 and 501)</td>
                <td>Average</td>
                <td>{statistics.standard?.totalAverage?.toFixed(2) ?? 0}</td>
              </tr>
              <tr>
                <td>Darts Thrown</td>
                <td>{statistics.standard?.totalDartsThrown ?? 0}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>{statistics.standard?.totalScore ?? 0}</td>
              </tr>
              <tr>
                <td>180's</td>
                <td>{statistics.standard?.["180's"] ?? 0}</td>
              </tr>
              <tr>
                <td>Wins</td>
                <td>{statistics.standard?.totalWins ?? 0}</td>
              </tr>
              <tr>
                <td>Defeats</td>
                <td>{statistics.standard?.totalDefeats ?? 0}</td>
              </tr>
              <tr>
                <td>Win Rate</td>
                <td>
                  {calculateWinRate(statistics.standard?.totalWins ?? 0, statistics.standard?.totalDefeats ?? 0)} %
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>CRI</td>
                <td>Wins</td>
                <td>{statistics.cri?.totalWins ?? 0}</td>
              </tr>
              <tr>
                <td>Defeats</td>
                <td>{statistics.cri?.totalDefeats ?? 0}</td>
              </tr>
              <tr>
                <td>Win Rate</td>
                <td>{calculateWinRate(statistics.cri?.totalWins ?? 0, statistics.cri?.totalDefeats ?? 0)} %</td>
              </tr>
              <tr>
                <td rowSpan={3}>RCL</td>
                <td>Wins</td>
                <td>{statistics.rcl?.totalWins ?? 0}</td>
              </tr>
              <tr>
                <td>Defeats</td>
                <td>{statistics.rcl?.totalDefeats ?? 0}</td>
              </tr>
              <tr>
                <td>Win Rate</td>
                <td>{calculateWinRate(statistics.rcl?.totalWins ?? 0, statistics.rcl?.totalDefeats ?? 0)} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
