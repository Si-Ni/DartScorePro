import "../../styles/Menu.css";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { BarLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(STATISTICS_URL, { withCredentials: true })
      .then((response) => {
        if (response.data.playerStats) setStatistics(response.data.playerStats);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const calculateWinRate = (wins: number, defeats: number) =>
    wins + defeats === 0 ? 0 : defeats === 0 ? 100 : Number(((wins / (wins + defeats)) * 100).toFixed(2));

  const { standard, cri, rcl } = statistics;

  return (
    <div className="hero  is-fullheight">
      {loading && <BarLoader id="top-barloader" color={"#00d1b2"} width={"100%"} />}
      <div className="hero-body is-justify-content-center is-align-items-center">
        <div className="table-container">
          {!loading && (
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
                  <td>{standard.totalAverage.toFixed(2) ?? 0}</td>
                </tr>
                <tr>
                  <td>Darts Thrown</td>
                  <td>{standard.totalDartsThrown ?? 0}</td>
                </tr>
                <tr>
                  <td>Score</td>
                  <td>{standard.totalScore ?? 0}</td>
                </tr>
                <tr>
                  <td>180's</td>
                  <td>{standard["180's"] ?? 0}</td>
                </tr>
                <tr>
                  <td>Wins</td>
                  <td>{standard.totalWins ?? 0}</td>
                </tr>
                <tr>
                  <td>Defeats</td>
                  <td>{standard.totalDefeats ?? 0}</td>
                </tr>
                <tr>
                  <td>Win Rate</td>
                  <td>{calculateWinRate(standard.totalWins ?? 0, standard.totalDefeats ?? 0)} %</td>
                </tr>
                <tr>
                  <td rowSpan={3}>CRI</td>
                  <td>Wins</td>
                  <td>{cri.totalWins ?? 0}</td>
                </tr>
                <tr>
                  <td>Defeats</td>
                  <td>{cri.totalDefeats ?? 0}</td>
                </tr>
                <tr>
                  <td>Win Rate</td>
                  <td>{calculateWinRate(cri.totalWins ?? 0, cri.totalDefeats ?? 0)} %</td>
                </tr>
                <tr>
                  <td rowSpan={3}>RCL</td>
                  <td>Wins</td>
                  <td>{rcl.totalWins ?? 0}</td>
                </tr>
                <tr>
                  <td>Defeats</td>
                  <td>{rcl.totalDefeats ?? 0}</td>
                </tr>
                <tr>
                  <td>Win Rate</td>
                  <td>{calculateWinRate(rcl.totalWins ?? 0, rcl.totalDefeats ?? 0)} %</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
