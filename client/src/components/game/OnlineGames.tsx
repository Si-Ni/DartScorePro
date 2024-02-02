import { useState } from "react";
import { OnlineGamesProps, PlayerToPlayerTotalGameStats } from "../../global/types";
import YesNoPopUp from "../popUps/YesNoPopUp";
import "../../styles/Games.css";
import NavigationButtons from "../buttons/NavigationButtons";
import OnlineStandardGames from "../onlineGamemodes/OnlineStandardGames";
import GameInformationHeader from "../GameInformationHeader/GameInformationHeader";

function OnlineGames(props: OnlineGamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [playerTotalGameStats, setPlayerTotalGameStats] = useState<PlayerToPlayerTotalGameStats>();
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(startingPlayerIndex);
  const [turns, setTurns] = useState<number>(0);

  const switchToNextPlayer = (): void => {};

  const gameProps = {
    players: props.players,
    playerTotalGameStats: playerTotalGameStats,
    setsToWin: props.setsToWin,
    legsForSet: props.legsForSet,
    throwsRemaining: throwsRemaining,
    currentRound: currentRound,
    startingPlayerIndex: startingPlayerIndex,
    currentPlayerIndex: currentPlayerIndex,
    switchToNextPlayer: switchToNextPlayer
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
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to leave the game?"}
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
      {props.selectedGamemode === "301" && <OnlineStandardGames currentRound={0} players={props.players} multiplier={1}/>}
      <NavigationButtons
        cbBackBtnClicked={() => {
          /* ToDo */
        }}
        marginTop={0}
      />
    </div>
  );
}

export default OnlineGames;
