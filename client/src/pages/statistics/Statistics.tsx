import "../../styles/Menu.css";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const STATISTICS_URL = "/api/userStats";

const defaultStatistics = {
  standard: {
    totalAverage: 0,
    totalDartsThrown: 0,
    totalScore: 0,
    "180's": 0,
    totalWins: 0,
    totalDefeats: 0
  },
  cri: {
    totalWins: 0,
    totalDefeats: 0
  },
  rcl: {
    totalWins: 0,
    totalDefeats: 0
  }
};

function Statistics() {
  const [statistics, setStatistics] = useState(defaultStatistics);

  useEffect(() => {
    axios
      .get(STATISTICS_URL, { withCredentials: true })
      .then((response) => {
        if (response.data.playerStats) setStatistics(response.data.playerStats);
      })
      .catch(() => {});
  }, []);

  const calculateWinRate = (wins, defeats) =>
    wins + defeats === 0 ? 0 : defeats === 0 ? 100 : Number(((wins / (wins + defeats)) * 100).toFixed(2));

  const { standard, cri, rcl } = statistics;

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
                <td>{standard.totalAverage.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Darts Thrown</td>
                <td>{standard.totalDartsThrown}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>{standard.totalScore}</td>
              </tr>
              <tr>
                <td>180's</td>
                <td>{standard["180's"]}</td>
              </tr>
              <tr>
                <td>Wins</td>
                <td>{standard.totalWins}</td>
              </tr>
              <tr>
                <td>Defeats</td>
                <td>{standard.totalDefeats}</td>
              </tr>
              <tr>
                <td>Win Rate</td>
                <td>{calculateWinRate(standard.totalWins, standard.totalDefeats)} %</td>
              </tr>
              <tr>
                <td rowSpan={3}>CRI</td>
                <td>Wins</td>
                <td>{cri.totalWins}</td>
              </tr>
              <tr>
                <td>Defeats</td>
                <td>{cri.totalDefeats}</td>
              </tr>
              <tr>
                <td>Win Rate</td>
                <td>{calculateWinRate(cri.totalWins, cri.totalDefeats)} %</td>
              </tr>
              <tr>
                <td rowSpan={3}>RCL</td>
                <td>Wins</td>
                <td>{rcl.totalWins}</td>
              </tr>
              <tr>
                <td>Defeats</td>
                <td>{rcl.totalDefeats}</td>
              </tr>
              <tr>
                <td>Win Rate</td>
                <td>{calculateWinRate(rcl.totalWins, rcl.totalDefeats)} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
