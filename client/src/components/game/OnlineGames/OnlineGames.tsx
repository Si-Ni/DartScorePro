import { useState } from "react";
import { PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "../../../types/global";
import YesNoPopUp from "../../popUps/YesNoPopUp/YesNoPopUp.tsx";
import "../../../styles/Games.css";
import NavigationButtons from "../../buttons/NavigationButtons/NavigationButtons.tsx";
import OnlineStandardGames from "../../onlineGamemodes/OnlineStandardGames/OnlineStandardGames.tsx";
import GameInformationHeader from "../../GameInformationHeader/GameInformationHeader";
import { OnlineGamesProps } from "./OnlineGames";

function OnlineGames(props: OnlineGamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [playerTotalGameStats, setPlayerTotalGameStats] = useState<PlayerToPlayerTotalGameStats>(
    props.initialGameStats.totalGameStats
  );
  const [throwsRemaining, setThrowsRemaining] = useState<number>(props.initialGameStats.throwsRemaining);
  const [currentRound, setCurrentRound] = useState<number>(props.initialGameStats.currentRound);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(props.initialGameStats.startingPlayer);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(props.initialGameStats.currentPlayer);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStats>(props.initialGameStats.playerStats);

  const gameProps = {
    players: props.players,
    playerTotalGameStats: playerTotalGameStats,
    playerStats: playerStats,
    throwsRemaining: throwsRemaining,
    currentRound: currentRound,
    startingPlayerIndex: startingPlayerIndex,
    currentPlayerIndex: currentPlayerIndex
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
      {props.selectedGamemode === "301" && <OnlineStandardGames {...gameProps} />}
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
