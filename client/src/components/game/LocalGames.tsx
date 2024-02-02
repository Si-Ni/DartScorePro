import { useState } from "react";
import { PlayerToPlayerTotalGameStats } from "../../types/global";
import CricketGame from "../localGamemodes/CricketGame";
import RoundTheClockGame from "../localGamemodes/RoundTheClockGame";
import LocalStandardGames from "../localGamemodes/LocalStandardGames";
import PopUp from "../popUps/PopUp";
import YesNoPopUp from "../popUps/YesNoPopUp";
import "../../styles/Games.css";
import NavigationButtons from "../buttons/NavigationButtons";
import GameInformationHeader from "../GameInformationHeader/GameInformationHeader";
import { LocalGamesProps } from "../../types/LocalGameProps";

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

function LocalGames(props: LocalGamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [playerTotalGameStats, setPlayerTotalGameStats] = useState<PlayerToPlayerTotalGameStats>(() =>
    initializePlayerTotalGameStats(props.players)
  );
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(startingPlayerIndex);
  const [turns, setTurns] = useState<number>(0);

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
      handlePlayerWon(playerKey);
    }

    resetRoundStatsForNextGame();
  };

  const handlePlayerWon = (playerKey: string) => {
    if (props.cbPlayerWon) {
      props.cbPlayerWon(playerKey);
    } else {
      setWinningPlayer(playerKey);
    }
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
    setTurns((turns) => turns + 1);
    if (turns === props.players.length - 1) {
      setCurrentRound((currentRound) => currentRound + 1);
      setTurns(0);
    }
    setThrowsRemaining(3);
  };

  const getWinnerPopUpText = (): string => {
    if (props.players.length === 1) {
      return "You have won!";
    }
    return `Player: ${winningPlayer} has won this game!`;
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
    modeIn: props.modeIn,
    modeOut: props.modeOut,
    setThrowsRemaining: setThrowsRemaining,
    setCurrentPlayerIndex: setCurrentPlayerIndex,
    setCurrentRound: setCurrentRound
  };

  return (
    <div className="App hero is-flex is-justify-content-center is-align-items-center is-fullheight">
      {winningPlayer && (
        <PopUp content={getWinnerPopUpText()} btnContent="End game" cbBtnClicked={props.cbBackBtnClicked} />
      )}
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to go back? All progress will be lost!"}
          cbYesClicked={props.cbBackBtnClicked}
          cbNoClicked={() => setShowGoToMainMenuPopUp(false)}
        />
      )}
      <GameInformationHeader
        throwsRemaining={throwsRemaining}
        setsToWin={props.setsToWin}
        legsForSet={props.legsForSet}
        modeIn={props.modeIn}
        modeOut={props.modeOut}
      />
      {props.selectedGamemode === "301" && (
        <LocalStandardGames {...gameProps} {...standardGamesProps} gamemodeTotalScore={301} />
      )}
      {props.selectedGamemode === "501" && (
        <LocalStandardGames {...gameProps} {...standardGamesProps} gamemodeTotalScore={501} />
      )}
      {props.selectedGamemode === "rcl" && <RoundTheClockGame {...gameProps} />}
      {props.selectedGamemode === "cri" && <CricketGame {...gameProps} />}
      <NavigationButtons cbBackBtnClicked={() => setShowGoToMainMenuPopUp(true)} marginTop={0} />
    </div>
  );
}

export default LocalGames;
