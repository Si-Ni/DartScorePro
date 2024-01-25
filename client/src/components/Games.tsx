import { useState } from "react";
import { GamesProps, PlayerToPlayerTotalGameStats } from "../global/types";
import CricketGame from "./CricketGame";
import RoundTheClockGame from "./RoundTheClockGame";
import StandardGames from "./StandardGames";
import PopUp from "./PopUp";
import YesNoPopUp from "./YesNoPopUp";

const initializePlayerTotalGameStats = (players: string[]): PlayerToPlayerTotalGameStats => {
  const initialStats: PlayerToPlayerTotalGameStats = {};
  players.forEach((player) => {
    initialStats[player] = {
      sets: 0,
      legs: 0
    };
  });
  return initialStats;
};

function Games(props: GamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [playerTotalGameStats, setPlayerTotalGameStats] = useState<PlayerToPlayerTotalGameStats>(() =>
    initializePlayerTotalGameStats(props.players)
  );
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(startingPlayerIndex);

  const updateGameStatsForWinningPlayer = (playerKey: string): void => {
    let currentLegs = playerTotalGameStats[playerKey].legs + 1;
    let currentSets = playerTotalGameStats[playerKey].sets;
    if (currentLegs === Number(props.legsForSet)) {
      currentSets++;
      currentLegs = 0;
    }

    setPlayerTotalGameStats((prevPlayerTotalGameStats) => ({
      ...prevPlayerTotalGameStats,
      [playerKey]: {
        ...prevPlayerTotalGameStats[playerKey],
        legs: currentLegs,
        sets: currentSets
      }
    }));

    if (currentSets === Number(props.setsToWin)) {
      setWinningPlayer(playerKey);
    }

    resetRoundStatsForNextGame();
  };

  const resetRoundStatsForNextGame = () => {
    const updatedStartingPlayerIndex = (startingPlayerIndex + 1) % props.players.length;
    setStartingPlayerIndex(updatedStartingPlayerIndex);
    setCurrentPlayerIndex(updatedStartingPlayerIndex);
    setCurrentRound(1);
    setThrowsRemaining(3);
  };

  const updateRemainingThrows = (): void => {
    setThrowsRemaining((throwsRemaining) => throwsRemaining - 1);
    if (throwsRemaining === 1) {
      switchToNextPlayer();
      setThrowsRemaining(3);
    }
  };

  const switchToNextPlayer = (): void => {
    setCurrentPlayerIndex((currentPlayerIndex) => (currentPlayerIndex + 1) % props.players.length);
    setCurrentRound((currentRound) =>
      currentPlayerIndex === props.players.length - 1 ? currentRound + 1 : currentRound
    );
    setThrowsRemaining(3);
  };

  const getWinnerPopUpText = (): string => {
    if (props.players.length === 1) {
      return "You have won!";
    }
    return `Player: ${winningPlayer} has won!`;
  };

  const gameProps = {
    players: props.players,
    playerTotalGameStats: playerTotalGameStats,
    setsToWin: props.setsToWin,
    legsForSet: props.legsForSet,
    cbPlayerHasWon: updateGameStatsForWinningPlayer,
    throwsRemaining: throwsRemaining,
    currentRound: currentRound,
    startingPlayerIndex: startingPlayerIndex,
    currentPlayerIndex: currentPlayerIndex,
    switchToNextPlayer: switchToNextPlayer,
    updateRemainingThrows: updateRemainingThrows
  };

  const standardGamesProps = {
    setThrowsRemaining: setThrowsRemaining,
    setCurrentPlayerIndex: setCurrentPlayerIndex,
    setCurrentRound: setCurrentRound
  };

  return (
    <div className="App hero is-flex is-justify-content-center is-align-items-center is-fullheight">
      {winningPlayer && (
        <PopUp content={getWinnerPopUpText()} btnContent={"Back"} cbBtnClicked={props.cbBackBtnClicked} />
      )}
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to go back? All progress will be lost!"}
          cbYesClicked={props.cbBackBtnClicked}
          cbNoClicked={() => setShowGoToMainMenuPopUp(false)}
        />
      )}
      {props.selectedGamemode === "301" && (
        <StandardGames {...gameProps} {...standardGamesProps} gamemodeTotalScore={4} />
      )}
      {props.selectedGamemode === "501" && (
        <StandardGames {...gameProps} {...standardGamesProps} gamemodeTotalScore={501} />
      )}
      {props.selectedGamemode === "rcl" && <RoundTheClockGame {...gameProps} />}
      {props.selectedGamemode === "cri" && <CricketGame {...gameProps} />}
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

export default Games;
