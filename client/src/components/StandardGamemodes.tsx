import { useEffect, useState } from "react";
import "../styles/App.css";
import type { JSX } from "react";
import { PlayerStats, PlayerToPlayerStats, StandardGamemodesProps } from "../global/types";
import PlayerScoreCard from "./PlayerScoreCard";

function StandardGamemodes(props: StandardGamemodesProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [players] = useState<string[]>(props.players);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStats>(() => {
    const initialPoints: PlayerToPlayerStats = {};
    props.players.forEach((player) => {
      initialPoints[player] = {
        score: props.gamemodeTotalScore,
        scoreAtBeginningOfRound: props.gamemodeTotalScore,
        average: 0,
        dartsThrown: 0,
        totalScore: 0,
        turns: 0,
      };
    });
    return initialPoints;
  });

  const handleScoreChange = (points: number): void => {
    if (multiplier === 3 && points === 25) return;

    saveScoreAtBeginningOfRound(currentPlayerIndex);

    const thrownPoints = points * multiplier;
    const updatedScore = calculateUpdatedScore(currentPlayerIndex, thrownPoints);

    const updatedScoreIsInvalid = updatedScore < 0 || updatedScore === 1 || (multiplier === 1 && updatedScore === 0);
    if (updatedScoreIsInvalid) {
      resetScoreToBeginningOfRound(currentPlayerIndex);
      switchToNextPlayer();
    } else {
      updateStatsAndRemainingThrows(updatedScore, thrownPoints);
      checkIfPlayerHasWon(updatedScore);
    }

    setMultiplier(1);
  };

  const saveScoreAtBeginningOfRound = (playerIndex: number): void => {
    const beginningOfRound = throwsRemaining === 3;
    if (beginningOfRound) {
      setPlayerStats((prevPlayerStats) => ({
        ...prevPlayerStats,
        [players[playerIndex]]: setBeginningScoreForPlayer(playerStats[players[playerIndex]]),
      }));
    }
    console.log(playerStats);
  };

  const setBeginningScoreForPlayer = (playerStats: PlayerStats): PlayerStats => {
    return {
      ...playerStats,
      scoreAtBeginningOfRound: playerStats.score,
    };
  };

  const calculateUpdatedScore = (playerIndex: number, thrownPoints: number): number => {
    const currentPlayerStats = playerStats[players[playerIndex]];
    const currentPlayerScore = currentPlayerStats.score;
    const updatedScore = currentPlayerScore - thrownPoints;
    return updatedScore;
  };

  const updateStatsAndRemainingThrows = (updatedScore: number, thrownPoints: number) => {
    updatePlayerStats(currentPlayerIndex, thrownPoints);
    updateRemainingThrows(updatedScore);
  };

  const checkIfPlayerHasWon = (updatedScore: number) => {
    const playerWon = updatedScore === 0 && multiplier === 2;
    if (playerWon) {
      console.log(`Player ${players[currentPlayerIndex]} wins!`);
    }
  };

  const updatePlayerStats = (playerIndex: number, thrownPoints: number): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: calculateNewPlayerStats(thrownPoints, playerStats[players[playerIndex]]),
    }));
  };

  const calculateNewPlayerStats = (thrownPoints: number, currentPlayerStats: PlayerStats): PlayerStats => ({
    ...currentPlayerStats,
    score: currentPlayerStats.score - thrownPoints,
    totalScore: currentPlayerStats.totalScore + thrownPoints,
    dartsThrown: currentPlayerStats.dartsThrown + 1,
    turns: throwsRemaining === 1 ? currentPlayerStats.turns + 1 : currentPlayerStats.turns,
    average: ((currentPlayerStats.totalScore + thrownPoints) * 3) / (currentPlayerStats.dartsThrown + 1),
  });

  const updateRemainingThrows = (updatedScore: number): void => {
    setThrowsRemaining((throwsRemaining) => throwsRemaining - 1);
    if (updatedScore === 0 || throwsRemaining === 1) {
      switchToNextPlayer();
      setThrowsRemaining(3);
    }
  };

  const switchToNextPlayer = (): void => {
    if (currentPlayerIndex === players.length - 1) {
      setCurrentPlayerIndex(0);
    } else {
      setCurrentPlayerIndex((currentPlayerIndex) => currentPlayerIndex + 1);
    }
    setThrowsRemaining(3);
  };

  const resetScoreToBeginningOfRound = (playerIndex: number) => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: resetScore(playerStats[players[playerIndex]]),
    }));
  };

  const resetScore = (playerStats: PlayerStats): PlayerStats => ({
    ...playerStats,
    score: playerStats.scoreAtBeginningOfRound,
  });

  const handleMultiplierClick = (multiplierValue: number): void => {
    setMultiplier(multiplierValue);
  };

  const handleReturnClick = (): void => {};

  const renderButtons = (): JSX.Element[] => {
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
        {players.map((player) => (
          <PlayerScoreCard
            key={player}
            playerName={player}
            isCurrentPlayer={players[currentPlayerIndex] === player}
            score={playerStats[player].score}
            average={playerStats[player].average}
          />
        ))}
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

export default StandardGamemodes;
