import { useEffect, useState } from "react";
import {
  PlayerToPlayerStats,
  PlayerToPlayerStatsCricket,
  PlayerToPlayerStatsRCl,
  PlayerToPlayerTotalGameStats
} from "../../../types/playerStats.ts";
import YesNoPopUp from "../../popUps/YesNoPopUp/YesNoPopUp.tsx";
import "../../../styles/Games.css";
import NavigationButtons from "../../buttons/NavigationButtons/NavigationButtons.tsx";
import OnlineStandardGames from "../../onlineGamemodes/OnlineStandardGames/OnlineStandardGames.tsx";
import OnlineRoundTheClockGame from "../../onlineGamemodes/OnlineRoundTheClockGame/OnlineRoundTheClockGame.tsx";
import OnlineCricketGame from "../../onlineGamemodes/OnlineCricketGame/OnlineCricketGame.tsx";
import { OnlineGamesProps } from "./OnlineGames";
import GameInformationHeader from "../../GameInformation/GameInformationHeader.tsx";
import { DGameData } from "../../../pages/onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayerDTOs.tsx";
import EndGamePopUp from "../../popUps/EndGamePopUp/EndGamePopUp.tsx";

function OnlineGames(props: OnlineGamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [playerTotalGameStats, setPlayerTotalGameStats] = useState<PlayerToPlayerTotalGameStats>(
    props.initialGameStats.totalGameStats
  );
  const [throwsRemaining, setThrowsRemaining] = useState<number>(props.initialGameStats.throwsRemaining);
  const [currentRound, setCurrentRound] = useState<number>(props.initialGameStats.currentRound);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(props.initialGameStats.startingPlayerIndex);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(props.initialGameStats.currentPlayerIndex);
  const [playerStats, setPlayerStats] = useState<
    PlayerToPlayerStats | PlayerToPlayerStatsRCl | PlayerToPlayerStatsCricket
  >(props.initialGameStats.playerStats);
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);

  const checkIsPlayersTurn = (currentPlayerIndex: number): boolean => {
    return props.players[currentPlayerIndex] === props.displayUserID;
  };
  const [isPlayersTurn, setIsPlayersTurn] = useState<boolean>(
    checkIsPlayersTurn(props.initialGameStats.currentPlayerIndex)
  );

  useEffect(() => {
    const handleStatsUpdated = (data: DGameData) => {
      setPlayerTotalGameStats(data.totalGameStats);
      setPlayerStats(data.playerStats);
      setThrowsRemaining(data.throwsRemaining);
      setCurrentRound(data.currentRound);
      setStartingPlayerIndex(data.startingPlayerIndex);
      setCurrentPlayerIndex(data.currentPlayerIndex);
      setIsPlayersTurn(checkIsPlayersTurn(data.currentPlayerIndex));

      if (data.winner) {
        setWinningPlayer(data.winner);
      }
    };

    props.socket.on("gameStatsUpdated", handleStatsUpdated);

    return () => {
      props.socket.off("gameStatsUpdated", handleStatsUpdated);
    };
  }, [props.socket]);

  const getWinnerPopUpText = (): string => {
    if (props.players.length === 1) {
      return "You have won!";
    }
    return `Player: ${winningPlayer} has won this game!`;
  };

  const gameProps = {
    socket: props.socket,
    lobbyCode: props.lobbyCode,
    players: props.players,
    playerTotalGameStats: playerTotalGameStats,
    throwsRemaining: throwsRemaining,
    currentRound: currentRound,
    startingPlayerIndex: startingPlayerIndex,
    currentPlayerIndex: currentPlayerIndex,
    isPlayersTurn: isPlayersTurn
  };

  return (
    <div className="App hero is-flex is-justify-content-center is-align-items-center is-fullheight">
      {winningPlayer && (
        <EndGamePopUp
          winnerName={winningPlayer}
          totalGameStats={playerTotalGameStats[winningPlayer]}
          gameType={"online"}
          gamemode={props.selectedGamemode}
          cbBtnClicked={props.cbBackBtnClicked}
        />
      )}
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
      {(props.selectedGamemode === "301" || props.selectedGamemode === "501") && (
        <OnlineStandardGames {...gameProps} playerStats={playerStats as PlayerToPlayerStats} />
      )}
      {props.selectedGamemode === "rcl" && (
        <OnlineRoundTheClockGame {...gameProps} playerStats={playerStats as PlayerToPlayerStatsRCl} />
      )}
      {props.selectedGamemode === "cri" && (
        <OnlineCricketGame {...gameProps} playerStats={playerStats as PlayerToPlayerStatsCricket} />
      )}
      <NavigationButtons cbBackBtnClicked={props.cbBackBtnClicked} marginTop={0} />
    </div>
  );
}

export default OnlineGames;
