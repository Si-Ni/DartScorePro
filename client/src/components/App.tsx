import { useState } from "react";
import "../styles/App.css";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(501);
  const [player2Score, setPlayer2Score] = useState(501);
  const [throwsRemaining, setThrowsRemaining] = useState(3);
  const [multiplier, setMultiplier] = useState(1);
  const [playerStats, setPlayerStats] = useState({
    1: { average: 0, dartsThrown: 0, totalScore: 0, turns: 0 },
    2: { average: 0, dartsThrown: 0, totalScore: 0, turns: 0 },
  });

  const updatePlayerStats = (score, currentPlayerStats) => ({
    ...currentPlayerStats,
    totalScore: currentPlayerStats.totalScore + score,
    dartsThrown: currentPlayerStats.dartsThrown + 1,
    turns: throwsRemaining === 1 ? currentPlayerStats.turns + 1 : currentPlayerStats.turns,
    average: ((currentPlayerStats.totalScore + score) * 3) / (currentPlayerStats.dartsThrown + 1),
  });
  console.log(playerStats);
  const handleScoreChange = (points) => {
    const adjustedPoints = points * multiplier;

    if (multiplier === 3 && points === 25) return;

    const currentPlayerStats = playerStats[currentPlayer];
    const currentPlayerScore = currentPlayer === 1 ? player1Score : player2Score;
    const updatedScore = currentPlayerScore - adjustedPoints;

    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [currentPlayer]: updatePlayerStats(adjustedPoints, currentPlayerStats),
    }));

    if (updatedScore < 0 || updatedScore === 1 || (multiplier === 1 && updatedScore === 0)) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setThrowsRemaining(3);
    } else {
      currentPlayer === 1 ? setPlayer1Score(updatedScore) : setPlayer2Score(updatedScore);

      setThrowsRemaining((throwsRemaining) => throwsRemaining - 1);

      if (updatedScore === 0 && multiplier === 2) {
        console.log(`Player ${currentPlayer} wins!`);
      }

      if (updatedScore === 0 || throwsRemaining === 1) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setThrowsRemaining(3);
      }
    }
    setMultiplier(1);
  };

  const handleMultiplierClick = (multiplierValue) => {
    setMultiplier(multiplierValue);
  };

  const handleReturnClick = () => {};

  const renderButtons = () => {
    const numbers = [...Array(21).keys()].map((num) => num).concat(25);

    return numbers.map((number) => (
      <button
        key={number}
        className="button is-primary m-1 is-size-5"
        onClick={() => handleScoreChange(number)}
        style={{ width: "20px" }}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="App hero is-flex is-justify-content-center is-align-items-center is-fullheight">
      <div className="columns is-centered">
        <div className="column is-full">
          <div className="box" style={{ borderLeft: currentPlayer === 1 ? "5px solid red" : "" }}>
            <h1 className="title is-5">Player 1</h1>
            <p className="subtitle is-1">{player1Score}</p>
            <div className="average-box">
              <p className="subtitle is-6">Average: {playerStats[1].average.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="column is-full">
          <div className="box" style={{ borderLeft: currentPlayer === 2 ? "5px solid red" : "" }}>
            <h1 className="title is-5">Player 2</h1>
            <p className="subtitle is-1">{player2Score}</p>
            <div className="average-box">
              <p className="subtitle is-6">Average: {playerStats[2].average.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column ">
          <div className="box">{renderButtons()}</div>
        </div>
      </div>
      <div className="columns is-centered">
        <button className="button is-success m-1 is-size-5" onClick={() => handleMultiplierClick(2)}>
          Double
        </button>
        <button className="button is-warning m-1 is-size-5" onClick={() => handleMultiplierClick(3)}>
          Triple
        </button>
        <button className="button is-danger m-1 is-size-5" onClick={handleReturnClick}>
          Return
        </button>
      </div>
    </div>
  );
}

export default App;
