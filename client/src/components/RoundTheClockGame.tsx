import { useState } from "react";
import { PlayerToPlayerStatsRCl, RoundTheClockGameProps } from "../global/types";
import YesNoPopUp from "./YesNoPopUp";
import PlayerScoreCard from "./PlayerScoreCard";

const initializePlayerStats = (players: string[]): PlayerToPlayerStatsRCl => {
  const initialPoints: PlayerToPlayerStatsRCl = {};
  players.forEach((player) => {
    initialPoints[player] = {
      currentTarget: 1,
    };
  });
  return initialPoints;
};

function RoundTheClockGame(props: RoundTheClockGameProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [players, setPlayers] = useState<string[]>(props.players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStatsRCl>(() => initializePlayerStats(props.players));

  const handleHitClicked = () => {
    if (checkIfPlayerHasWon(currentPlayerIndex)) {
      console.log(players[currentPlayerIndex] + " has won!");
    } else {
      increaseTargetByOne(currentPlayerIndex);
    }
    updateRemainingThrows();
  };

  const checkIfPlayerHasWon = (playerIndex: number): boolean => {
    const currentPlayerStats = playerStats[players[playerIndex]];
    return currentPlayerStats.currentTarget === 20;
  };

  const increaseTargetByOne = (playerIndex: number): void => {
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: {
        ...prevPlayerStats[playerKey],
        currentTarget: prevPlayerStats[playerKey].currentTarget + 1,
      },
    }));
  };

  const updateRemainingThrows = () => {
    const endOfTurn = throwsRemaining === 1;
    if (endOfTurn) {
      switchToNextPlayer();
    } else {
      setThrowsRemaining((throwsRemaining) => throwsRemaining - 1);
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

  const handleMissClicked = () => {
    updateRemainingThrows();
  };

  const handleNextClicked = () => {
    switchToNextPlayer();
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
        <p className="is-size-3 mb-6" style={{ textAlign: "center" }}>
          Round: {currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {players.map((player) => (
          <PlayerScoreCard
            key={player}
            playerName={player}
            isCurrentPlayer={players[currentPlayerIndex] === player}
            score={playerStats[player].currentTarget}
            lastThrows={[]}
          />
        ))}
      </div>
      <div className="columns is-centered mt-6">
        <button className="button is-success m-1 is-size-5 uniformButton" onClick={handleHitClicked}>
          Hit
        </button>
        <button className="button is-danger m-1 is-size-5 uniformButton" onClick={handleMissClicked}>
          Miss
        </button>
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <button className="button is-warning m-1 is-size-5" style={{ width: "150px" }} onClick={handleNextClicked}>
            Next Player
          </button>
        </div>
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

export default RoundTheClockGame;
