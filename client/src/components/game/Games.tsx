import { useState } from "react";
import { GamesProps, PlayerToPlayerTotalGameStats } from "../../global/types";
import CricketGame from "../gamemodes/CricketGame";
import RoundTheClockGame from "../gamemodes/RoundTheClockGame";
import StandardGames from "../gamemodes/StandardGames";
import PopUp from "../popUps/PopUp";
import YesNoPopUp from "../popUps/YesNoPopUp";
import "../../styles/Games.css";
import NavigationButtons from "../buttons/NavigationButtons";

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
      <div className="is-flex is-justify-content-center m-0 pt-2 pb-2 gameInfo">
        <p className="is-size-6 mr-4" style={{ textAlign: "center" }}>
          <strong>Remaining throws:</strong> {throwsRemaining}
        </p>
        <p className="is-size-6 mr-4" style={{ textAlign: "center" }}>
          <strong>First to:</strong> {props.setsToWin} {props.setsToWin > 1 ? "Sets" : "Set"}
        </p>
        <p className="is-size-6 mr-0" style={{ textAlign: "center" }}>
          <strong>Legs per set:</strong> {props.legsForSet}
        </p>
      </div>
      {props.selectedGamemode === "301" && (
        <StandardGames {...gameProps} {...standardGamesProps} gamemodeTotalScore={301} />
      )}
      {props.selectedGamemode === "501" && (
        <StandardGames {...gameProps} {...standardGamesProps} gamemodeTotalScore={501} />
      )}
      {props.selectedGamemode === "rcl" && <RoundTheClockGame {...gameProps} />}
      {props.selectedGamemode === "cri" && <CricketGame {...gameProps} />}
      <NavigationButtons cbBackBtnClicked={() => setShowGoToMainMenuPopUp(true)} marginTop={0} />
    </div>
  );
}

export default Games;
