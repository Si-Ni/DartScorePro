import { useState } from "react";
import "../styles/App.css";
import "../styles/Games.css";
import { PlayerStats, PlayerToPlayerStats, StandardGamesProps } from "../global/types";
import PlayerScoreCard from "./PlayerScoreCard";
import GameInputButtons from "./GameInputButtons";
import { getAllOptions, sumRound } from "../helpers/calcCheckouts";

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
      checkoutOptions: []
    };
  });
  return initialPoints;
};

function StandardGames({ currentPlayerIndex, throwsRemaining, ...props }: StandardGamesProps) {
  const [players] = useState<string[]>(props.players);
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
      throwsRemaining: throwsRemaining
    });
  };

  const saveBeginningScore = (playerIndex: number): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: setBeginningScoreForPlayer(playerStats[players[playerIndex]])
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
      [playerKey]: setLastThrows(playerStats[playerKey], [])
    }));
  };

  const formatThrowToString = (value: number | string, multiplier: number): string =>
    multiplier === 2 && value === 25 ? "BULL" : `${multiplier > 1 ? ["D", "T"][multiplier - 2] : ""}${value}`;

  const addThrowToLastThrows = (playerIndex: number, points: number, multiplier: number): void => {
    const formattedThrow = formatThrowToString(points, multiplier);
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: setLastThrows(playerStats[playerKey], [...prevPlayerStats[playerKey].lastThrows, formattedThrow])
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
      props.switchToNextPlayer();
    } else {
      updatePlayerStatsByThrownPoints(currentPlayerIndex, thrownPoints);
      props.updateRemainingThrows();
      checkIfPlayerHasWon(updatedScore, playerIndex);
    }

    setMultiplier(1);
  };

  const calculateUpdatedScore = (playerIndex: number, thrownPoints: number): number => {
    const currentPlayerStats = playerStats[players[playerIndex]];
    const currentPlayerScore = currentPlayerStats.score;
    const updatedScore = currentPlayerScore - thrownPoints;
    return updatedScore;
  };

  const checkIfPlayerHasWon = (updatedScore: number, playerIndex: number) => {
    const playerWon = updatedScore === 0 && multiplier === 2;
    if (playerWon) {
      props.cbPlayerHasWon(players[playerIndex]);
      setPlayerStats(initializePlayerStats(props.players, props.gamemodeTotalScore));
    }
  };

  const updatePlayerStatsByThrownPoints = (playerIndex: number, thrownPoints: number): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: calculateNewPlayerStats(thrownPoints, playerStats[players[playerIndex]])
    }));
  };

  const calculateNewPlayerStats = (thrownPoints: number, currentPlayerStats: PlayerStats): PlayerStats => ({
    ...currentPlayerStats,
    score: currentPlayerStats.score - thrownPoints,
    totalScore: currentPlayerStats.totalScore + thrownPoints,
    dartsThrown: currentPlayerStats.dartsThrown + 1,
    turns: throwsRemaining === 1 ? currentPlayerStats.turns + 1 : currentPlayerStats.turns,
    average: ((currentPlayerStats.totalScore + thrownPoints) * 3) / (currentPlayerStats.dartsThrown + 1),
    checkoutOptions: getAllOptions(3).filter((r) => sumRound(r) === currentPlayerStats.score - thrownPoints)
  });

  const resetScoreToBeginningOfRound = (playerIndex: number) => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: resetScore(playerStats[players[playerIndex]])
    }));
  };

  const resetScore = (playerStats: PlayerStats): PlayerStats => ({
    ...playerStats,
    score: playerStats.scoreAtBeginningOfRound
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

    props.setThrowsRemaining(previousPlayerStats.throwsRemaining);

    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: {
        ...prevPlayerStats[players[playerIndex]],
        ...previousPlayerStats
      } as PlayerStats
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
    if (switchToPrevRound) props.setCurrentRound((currentRound) => currentRound - 1);
  };

  const switchToPlayersLastTurn = (playerIndex: number): void => {
    props.setCurrentPlayerIndex(playerIndex);
    props.setThrowsRemaining(1);
  };

  return (
    <>
      <div className="is-centered">
        <p className="is-size-3 mb-3" style={{ textAlign: "center" }}>
          Round: {props.currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {players.map((player) => (
          <PlayerScoreCard
            key={player}
            playerName={player}
            isStartingPlayer={players[props.startingPlayerIndex] === player}
            isCurrentPlayer={players[currentPlayerIndex] === player}
            score={playerStats[player].score}
            average={playerStats[player].average}
            lastThrows={playerStats[player].lastThrows}
            checkoutOptions={playerStats[player].checkoutOptions}
            sets={props.playerTotalGameStats[player].sets}
            legs={props.playerTotalGameStats[player].legs}
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
          <div className="box">
            {
              <GameInputButtons
                values={[...Array(21).keys()].map((num) => num).concat(25)}
                cbHandleButtonClicked={handleScoreChange}
                showMissButton={false}
                btnSize={20}
              />
            }
          </div>
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
    </>
  );
}

export default StandardGames;
