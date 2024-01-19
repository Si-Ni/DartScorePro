import { useState } from "react";
import "../styles/App.css";
import "../styles/Games.css";
import type { JSX } from "react";
import { PlayerStats, PlayerToPlayerStats, StandardGamesProps } from "../global/types";
import PlayerScoreCard from "./PlayerScoreCard";
import YesNoPopUp from "./YesNoPopUp";
import { getAllOptions, Round, stringifyRound, sumRound } from "../helpers/calcCheckouts";

const initializePlayerStats = (players: string[], gamemodeTotalScore: number): PlayerToPlayerStats => {
  const initialPoints: PlayerToPlayerStats = {};
  players.forEach((player) => {
    initialPoints[player] = {
      score: gamemodeTotalScore,
      scoreAtBeginningOfRound: gamemodeTotalScore,
      average: 0,
      dartsThrown: 0,
      totalScore: 0,
      turns: 0,
      lastThrows: [],
      throwsRemaining: 0,
      checkoutOptions: [],
    };
  });
  return initialPoints;
};

function StandardGames(props: StandardGamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [players] = useState<string[]>(props.players);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [previousPlayerStats, setPreviousPlayerStats] = useState<PlayerStats | Record<string, never>>({});
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStats>(() =>
    initializePlayerStats(props.players, props.gamemodeTotalScore)
  );

  const handleScoreChange = (points: number): void => {
    if (multiplier === 3 && points === 25) return;

    savePreviousPlayerStats(currentPlayerIndex);
    const beginningOfRound = throwsRemaining === 3;
    if (beginningOfRound) {
      saveBeginningScore(currentPlayerIndex);
      clearLastThrowsOfPlayer(currentPlayerIndex);
    }

    addThrowToLastThrows(currentPlayerIndex, points, multiplier);

    updateScoreForPlayerAndContinueGame(currentPlayerIndex, points);
  };

  const savePreviousPlayerStats = (playerIndex: number): void => {
    setPreviousPlayerStats({
      ...structuredClone(playerStats[players[playerIndex]]),
      throwsRemaining: throwsRemaining,
    });
  };

  const saveBeginningScore = (playerIndex: number): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: setBeginningScoreForPlayer(playerStats[players[playerIndex]]),
    }));
  };

  const setBeginningScoreForPlayer = (playerStats: PlayerStats): PlayerStats => {
    playerStats.scoreAtBeginningOfRound = playerStats.score;
    return playerStats;
  };

  const clearLastThrowsOfPlayer = (playerIndex: number): void => {
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: setLastThrows(playerStats[playerKey], []),
    }));
  };

  const formatThrowToString = (value: number | string, mulitplier: number): string => {
    if (value === 25 && mulitplier === 2) return "BULL";
    else if (mulitplier === 2) return `D${value}`;
    else if (mulitplier === 3) return `T${value}`;
    else return `${value}`;
  };

  const addThrowToLastThrows = (playerIndex: number, points: number, multiplier: number): void => {
    const formattedThrow = formatThrowToString(points, multiplier);
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: setLastThrows(playerStats[playerKey], [...prevPlayerStats[playerKey].lastThrows, formattedThrow]),
    }));
  };

  const setLastThrows = (playerStats: PlayerStats, lastThrows: string[]): PlayerStats => {
    playerStats.lastThrows = lastThrows;
    return playerStats;
  };

  const updateScoreForPlayerAndContinueGame = (playerIndex: number, points: number): void => {
    const thrownPoints = points * multiplier;
    const updatedScore = calculateUpdatedScore(playerIndex, thrownPoints);

    const updatedScoreIsInvalid = updatedScore < 0 || updatedScore === 1 || (multiplier === 1 && updatedScore === 0);

    if (updatedScoreIsInvalid) {
      resetScoreToBeginningOfRound(playerIndex);
      switchToNextPlayer();
    } else {
      updateStatsAndRemainingThrows(updatedScore, thrownPoints);
      checkIfPlayerHasWon(updatedScore);
    }

    setMultiplier(1);
  };

  const calculateUpdatedScore = (playerIndex: number, thrownPoints: number): number => {
    const currentPlayerStats = playerStats[players[playerIndex]];
    const currentPlayerScore = currentPlayerStats.score;
    const updatedScore = currentPlayerScore - thrownPoints;
    return updatedScore;
  };

  const updateStatsAndRemainingThrows = (updatedScore: number, thrownPoints: number) => {
    updatePlayerStatsByThrownPoints(currentPlayerIndex, thrownPoints);
    updateRemainingThrows(updatedScore);
  };

  const checkIfPlayerHasWon = (updatedScore: number) => {
    const playerWon = updatedScore === 0 && multiplier === 2;
    if (playerWon) {
      console.log(`Player ${players[currentPlayerIndex]} wins!`);
    }
  };

  const updatePlayerStatsByThrownPoints = (playerIndex: number, thrownPoints: number): void => {
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
    checkoutOptions: getAllOptions(3).filter((r) => sumRound(r) === currentPlayerStats.score - thrownPoints),
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
      setCurrentRound((currentRound) => currentRound + 1);
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

  const handleUndoClick = (): void => {
    if (Object.keys(previousPlayerStats).length === 0) return;

    switchToPrevRoundForUndoIfNecessary();

    const playerIndex = getIndexOfPlayerFromLastTurn();

    const switchToPrevPlayer = playerIndex !== currentPlayerIndex || (throwsRemaining === 3 && players.length === 1);
    if (switchToPrevPlayer) switchToPlayersLastTurn(playerIndex);

    setThrowsRemaining(previousPlayerStats.throwsRemaining);

    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: {
        ...prevPlayerStats[players[playerIndex]],
        ...previousPlayerStats,
      } as PlayerStats,
    }));
  };

  const getIndexOfPlayerFromLastTurn = (): number => {
    let playerIndex = currentPlayerIndex;
    if (throwsRemaining === 3 && playerIndex != 0) {
      playerIndex--;
    } else if (throwsRemaining === 3) {
      playerIndex = players.length - 1;
    }
    return playerIndex;
  };

  const switchToPrevRoundForUndoIfNecessary = (): void => {
    const switchToPrevRound = throwsRemaining === 3 && currentPlayerIndex === 0;
    if (switchToPrevRound) setCurrentRound((currentRound) => currentRound - 1);
  };

  const switchToPlayersLastTurn = (playerIndex: number): void => {
    setCurrentPlayerIndex(playerIndex);
    setThrowsRemaining(1);
  };

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
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to go back? All progress will be lost!"}
          cbYesClicked={props.cbReturnToMenu}
          cbNoClicked={() => setShowGoToMainMenuPopUp(false)}
        />
      )}
      <div className="is-centered">
        <p className="is-size-3 mb-3" style={{ textAlign: "center" }}>
          Round: {currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {players.map((player) => (
          <PlayerScoreCard
            key={player}
            playerName={player}
            isCurrentPlayer={players[currentPlayerIndex] === player}
            score={playerStats[player].score}
            average={playerStats[player].average}
            lastThrows={playerStats[player].lastThrows}
          />
        ))}
      </div>
      <div className="is-centered">
        <p className="is-size-6 mb-1" style={{ textAlign: "center" }}>
          Remaining throws: {throwsRemaining}
        </p>
      </div>
      <div className="columns is-centered">
        <div className="column">
          <div className="box">{renderButtons()}</div>
        </div>
      </div>
      <div className="columns is-centered">
        <button className="button is-success m-1 is-size-5 uniformButton" onClick={() => handleMultiplierClick(2)}>
          Double
        </button>
        <button className="button is-warning m-1 is-size-5 uniformButton" onClick={() => handleMultiplierClick(3)}>
          Triple
        </button>
        <button className="button is-danger m-1 is-size-5 uniformButton" onClick={handleUndoClick}>
          Undo
        </button>
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <button
            className="button is-danger m-1 is-size-5 uniformButton"
            onClick={() => {
              setShowGoToMainMenuPopUp(true);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default StandardGames;
