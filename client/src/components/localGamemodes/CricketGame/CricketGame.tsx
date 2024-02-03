import { useState } from "react";

import CricketGameView from "../../gamemodeViews/CricketGameView/CricketGameView.tsx";
import { CricketGameProps, CricketStatus, PlayerStatsCricket, PlayerToPlayerStatsCricket } from "./CricketGame";

const initializePlayerStats = (players: string[]): PlayerToPlayerStatsCricket => {
  const initialPoints: PlayerToPlayerStatsCricket = {};
  players.forEach((player) => {
    initialPoints[player] = {
      score: 0,
      cricketStats: {
        20: 0,
        19: 0,
        18: 0,
        17: 0,
        16: 0,
        15: 0,
        Bull: 0
      }
    };
  });
  return initialPoints;
};

function CricketGame(props: CricketGameProps) {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [players] = useState<string[]>(props.players);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStatsCricket>(() =>
    initializePlayerStats(props.players)
  );

  const handleScoreBtnClicked = (points: number): void => {
    const validThrow = !(points === 25 && multiplier === 3);
    if (validThrow) {
      updatePlayerStats(props.currentPlayerIndex, points);
      props.updateRemainingThrows();
    }
    setMultiplier(1);
  };

  const updatePlayerStats = (playerIndex: number, points: number): void => {
    if (points === 0) return;

    const statsKey = getCricketStatsKey(points);
    const playerKey = players[playerIndex];
    const currentCricketStatusValue = playerStats[playerKey].cricketStats[statsKey];

    if (currentCricketStatusValue < 3) {
      updateCricketStatusAndScore(playerKey, points);
    } else if (currentCricketStatusValue === 3) {
      increasePlayerScore(playerKey, points * multiplier);
      checkIfPlayerHasWon(playerKey, points * multiplier, statsKey, currentCricketStatusValue);
    }
  };

  const getCricketStatsKey = (points: number): string => {
    return points === 25 ? "Bull" : points.toString();
  };

  const updateCricketStatusAndScore = (playerKey: string, points: number): void => {
    const statsKey = getCricketStatsKey(points);

    let timesHitted = multiplier;
    let updatedCricketStatus = playerStats[playerKey].cricketStats[statsKey];

    while (updatedCricketStatus < 3 && timesHitted > 0) {
      timesHitted--;
      updatedCricketStatus++;
    }

    const numberIsClosedForAllPlayers =
      updatedCricketStatus === 3 && checkIfNumberIsClosedByOtherPlayers(playerKey, statsKey);

    if (numberIsClosedForAllPlayers) {
      setCricketStatusClosedForEverybody(statsKey);
      updatedCricketStatus++;
    }

    let remainingScore = 0;
    const playerCanIncreaseScore = updatedCricketStatus === 3 && timesHitted > 0;
    if (playerCanIncreaseScore) {
      remainingScore = points * timesHitted;
    }

    updateCricketStatusAndAddScoreForPlayer(playerKey, statsKey, updatedCricketStatus, remainingScore);
    checkIfPlayerHasWon(playerKey, points * timesHitted, statsKey, updatedCricketStatus);
  };

  const checkIfNumberIsClosedByOtherPlayers = (playerKey: string, statsKey: string): boolean => {
    let numberClosedByOtherPlayers = true;
    players.forEach((player) => {
      const numberNotClosed = player != playerKey && playerStats[player].cricketStats[statsKey] < 3;
      if (numberNotClosed) {
        numberClosedByOtherPlayers = false;
        return;
      }
    });
    return numberClosedByOtherPlayers;
  };

  const setCricketStatusClosedForEverybody = (statsKey: string) => {
    setPlayerStats((prevPlayerStats) => {
      const updatedPlayerStats = { ...prevPlayerStats };

      Object.keys(updatedPlayerStats).forEach((playerKey) => {
        updatedPlayerStats[playerKey] = {
          ...updatedPlayerStats[playerKey],
          cricketStats: {
            ...updatedPlayerStats[playerKey].cricketStats,
            [statsKey]: 4
          }
        } as PlayerStatsCricket;
      });

      return updatedPlayerStats;
    });
  };

  const updateCricketStatusAndAddScoreForPlayer = (
    playerKey: string,
    statsKey: string,
    currentCricketStatusValue: number,
    thrownPoints: number
  ): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: {
        ...prevPlayerStats[playerKey],
        score: prevPlayerStats[playerKey].score + thrownPoints,
        cricketStats: {
          ...prevPlayerStats[playerKey].cricketStats,
          [statsKey]: currentCricketStatusValue as CricketStatus
        }
      }
    }));
  };

  const increasePlayerScore = (playerKey: string, thrownPoints: number): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: {
        ...prevPlayerStats[playerKey],
        score: prevPlayerStats[playerKey].score + thrownPoints
      }
    }));
  };

  const checkIfPlayerHasWon = (
    playerKey: string,
    thrownPoints: number,
    currentCricketStatus: string,
    currentCricketStatusValue: number
  ): void => {
    const highestScore = calculateHighestScore();
    const playersScore = playerStats[playerKey].score + thrownPoints;
    if (
      playerHasClosedAll(playerKey, currentCricketStatus, currentCricketStatusValue) &&
      playersScore >= highestScore
    ) {
      props.cbPlayerHasWon(playerKey);
      setPlayerStats(initializePlayerStats(props.players));
    }
  };

  const calculateHighestScore = (): number => {
    let highestScore = 0;
    Object.keys(playerStats).forEach((playerKey) => {
      const playersScore = playerStats[playerKey].score;
      if (playersScore > highestScore) highestScore = playersScore;
    });
    return highestScore;
  };

  const playerHasClosedAll = (
    playerKey: string,
    currentCricketStatus: string,
    currentUpdatedCricketStatusValue: number
  ): boolean => {
    if (currentUpdatedCricketStatusValue < 3) return false;
    const currentPlayerCricketStats = playerStats[playerKey].cricketStats;
    let closedAll = true;
    Object.keys(currentPlayerCricketStats).forEach((cricketStatus) => {
      if (cricketStatus != currentCricketStatus && currentPlayerCricketStats[cricketStatus] < 3) {
        closedAll = false;
        return;
      }
    });
    return closedAll;
  };

  const handleMultiplierClick = (multiplierValue: number): void => {
    setMultiplier(multiplierValue);
  };

  return (
    <CricketGameView
      currentRound={props.currentRound}
      players={players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      cbHandleScoreBtnClicked={handleScoreBtnClicked}
      multiplier={multiplier}
      cbHandleMultiplierClicked={handleMultiplierClick}
      playerStats={playerStats}
    />
  );
}

export default CricketGame;
