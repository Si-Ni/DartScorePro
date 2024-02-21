import { useState } from "react";
import RoundTheClockGameView from "../../gamemodeViews/RoundTheClockGameView/RoundTheClockGameView.tsx";
import { LocalRoundTheClockGameProps } from "./LocalRoundTheClockGame.ts";
import { PlayerToPlayerStatsRCl } from "../../../types/playerStats.ts";

const initializePlayerStats = (players: string[]): PlayerToPlayerStatsRCl => {
  const initialPoints: PlayerToPlayerStatsRCl = {};
  players.forEach((player) => {
    initialPoints[player] = {
      currentTarget: 1,
      lastThrows: []
    };
  });
  return initialPoints;
};

function LocalRoundTheClockGame({ throwsRemaining, currentPlayerIndex, ...props }: LocalRoundTheClockGameProps) {
  const [players] = useState<string[]>(props.players);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStatsRCl>(() => initializePlayerStats(props.players));

  const handleHitClicked = (): void => {
    if (checkIfPlayerHasWon(currentPlayerIndex)) {
      props.cbPlayerHasWon(players[currentPlayerIndex]);
      setPlayerStats(initializePlayerStats(props.players));
    } else {
      increaseTargetByOne(currentPlayerIndex);
    }
    props.updateRemainingThrows();
  };

  const checkIfPlayerHasWon = (playerIndex: number): boolean => {
    const currentPlayerStats = playerStats[players[playerIndex]];
    return currentPlayerStats.currentTarget === 20;
  };

  const increaseTargetByOne = (playerIndex: number): void => {
    const beginningOfRound = throwsRemaining === 3;
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: {
        ...prevPlayerStats[playerKey],
        currentTarget: prevPlayerStats[playerKey].currentTarget + 1,
        lastThrows: beginningOfRound ? ["Hit"] : [...prevPlayerStats[playerKey].lastThrows, "Hit"]
      }
    }));
  };

  const handleMissClicked = () => {
    addToLastThrows(currentPlayerIndex, ["Miss"]);
    props.updateRemainingThrows();
  };

  const addToLastThrows = (playerIndex: number, lastThrows: string[]): void => {
    const beginningOfRound = throwsRemaining === 3;
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: {
        ...prevPlayerStats[playerKey],
        lastThrows: beginningOfRound ? [...lastThrows] : [...prevPlayerStats[playerKey].lastThrows, ...lastThrows]
      }
    }));
  };

  const handleNextClicked = (): void => {
    addMissesToLastThrows(currentPlayerIndex);
    props.switchToNextPlayer();
  };

  const addMissesToLastThrows = (playerIndex: number): void => {
    const throws = [];
    for (let i = 0; i < throwsRemaining; i++) throws.push("Miss");
    addToLastThrows(playerIndex, throws);
  };

  return (
    <RoundTheClockGameView
      isLoggedIn={props.isLoggedIn}
      currentRound={props.currentRound}
      players={players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={currentPlayerIndex}
      playerStats={playerStats}
      playerTotalGameStats={props.playerTotalGameStats}
      cbHandleHitClicked={handleHitClicked}
      cbHandleMissClicked={handleMissClicked}
      cbHandleNextClicked={handleNextClicked}
    />
  );
}

export default LocalRoundTheClockGame;
