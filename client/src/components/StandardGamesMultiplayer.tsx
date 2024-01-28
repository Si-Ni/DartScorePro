import { useState } from "react";
import "../styles/App.css";
import "../styles/Games.css";
import { PlayerStats, PlayerToPlayerStats, StandardGamesProps } from "../global/types";
import PlayerScoreCard from "./PlayerScoreCard";
import YesNoPopUp from "./YesNoPopUp";
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

function StandardGamesMultiplayer(props: StandardGamesProps) {
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

  const handleScoreChange = (points: number): void => {};

  const savePreviousPlayerStats = (playerIndex: number): void => {};

  const saveBeginningScore = (playerIndex: number): void => {};

  const setBeginningScoreForPlayer = (playerStats: PlayerStats): PlayerStats => {};

  const clearLastThrowsOfPlayer = (playerIndex: number): void => {};

  const formatThrowToString = (value: number | string, multiplier: number): string =>
    multiplier === 2 && value === 25 ? "BULL" : `${multiplier > 1 ? ["D", "T"][multiplier - 2] : ""}${value}`;

  const addThrowToLastThrows = (playerIndex: number, points: number, multiplier: number): void => {};

  const setLastThrows = (playerStats: PlayerStats, lastThrows: string[]): PlayerStats => {};

  const updateScoreForPlayerAndContinueGame = (playerIndex: number, points: number): void => {};

  const calculateUpdatedScore = (playerIndex: number, thrownPoints: number): number => {};

  const updateStatsAndRemainingThrows = (updatedScore: number, thrownPoints: number) => {};

  const checkIfPlayerHasWon = (updatedScore: number) => {};

  const updatePlayerStatsByThrownPoints = (playerIndex: number, thrownPoints: number): void => {};

  const calculateNewPlayerStats = (thrownPoints: number, currentPlayerStats: PlayerStats): PlayerStats => ({});

  const updateRemainingThrows = (updatedScore: number): void => {};

  const switchToNextPlayer = (): void => {};

  const resetScoreToBeginningOfRound = (playerIndex: number) => {};

  const resetScore = (playerStats: PlayerStats): PlayerStats => ({});

  const handleMultiplierClick = (multiplierValue: number): void => {};

  const handleUndoClick = (): void => {};

  return (
    <div className="App hero is-flex is-justify-content-center is-align-items-center is-fullheight">
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to go back? All progress will be lost!"}
          cbYesClicked={props.cbBackBtnClicked}
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
            checkoutOptions={playerStats[player].checkoutOptions}
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

export default StandardGamesMultiplayer;
