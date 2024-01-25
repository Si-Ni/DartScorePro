import { useState } from "react";
import { GamesProps, PlayerToPlayerTotalGameStats } from "../global/types";
import CricketGame from "./CricketGame";
import RoundTheClockGame from "./RoundTheClockGame";
import StandardGames from "./StandardGames";

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
  const [playerTotalGameStats, setPlayerTotalGameStats] = useState<PlayerToPlayerTotalGameStats>(() =>
    initializePlayerTotalGameStats(props.players)
  );
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);

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
  };

  const gameProps = {
    players: props.players,
    playerTotalGameStats: playerTotalGameStats,
    cbBackBtnClicked: props.cbBackBtnClicked,
    setsToWin: props.setsToWin,
    legsForSet: props.legsForSet,
    cbPlayerHasWon: updateGameStatsForWinningPlayer,
    winningPlayer: winningPlayer
  };

  return (
    <div>
      {props.selectedGamemode === "301" && <StandardGames {...gameProps} gamemodeTotalScore={4} />}
      {props.selectedGamemode === "501" && <StandardGames {...gameProps} gamemodeTotalScore={501} />}
      {props.selectedGamemode === "rcl" && <RoundTheClockGame {...gameProps} />}
      {props.selectedGamemode === "cri" && <CricketGame {...gameProps} />}
    </div>
  );
}

export default Games;
