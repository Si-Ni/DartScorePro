import { useState } from "react";
import { CricketGameProps, CricketStatus, PlayerToPlayerStatsCricket } from "../../global/types";
import PlayerScoreCardCricket from "../playerScoreCards/PlayerScoreCardCricket";
import GameInputButtons from "../buttons/GameInputButtons";

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
  const [mulitplier, setMultiplier] = useState<number>(1);
  const [players] = useState<string[]>(props.players);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStatsCricket>(() =>
    initializePlayerStats(props.players)
  );

  const handleScoreBtnClicked = (points: number): void => {
    const validThrow = !(points === 25 && mulitplier === 3);
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
      increasePlayerScore(playerKey, points * mulitplier);
      checkIfPlayerHasWon(playerKey, points * mulitplier, statsKey, currentCricketStatusValue);
    }
  };

  const getCricketStatsKey = (points: number): string => {
    return points === 25 ? "Bull" : points.toString();
  };

  const updateCricketStatusAndScore = (playerKey: string, points: number): void => {
    const statsKey = getCricketStatsKey(points);

    let timesHitted = mulitplier;
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
        };
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
    <>
      <div className="is-centered">
        <p className="is-size-3 mb-3" style={{ textAlign: "center" }}>
          Round: {props.currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {players.map((player) => (
          <PlayerScoreCardCricket
            key={player}
            playerName={player}
            isStartingPlayer={players[props.startingPlayerIndex] === player}
            isCurrentPlayer={players[props.currentPlayerIndex] === player}
            score={playerStats[player].score}
            cricketStats={playerStats[player].cricketStats}
            sets={props.playerTotalGameStats[player].sets}
            legs={props.playerTotalGameStats[player].legs}
          />
        ))}
      </div>
      <div className="columns is-centered">
        <div className="column">
          <div className="box">
            {
              <GameInputButtons
                values={[...Array(6).keys()].map((num) => 20 - num).concat(25)}
                cbHandleButtonClicked={handleScoreBtnClicked}
                showMissButton={true}
                btnSize={60}
              />
            }
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <button className="button is-success m-1 is-size-5 uniformButton" onClick={() => handleMultiplierClick(2)}>
          Double
        </button>
        <button className="button is-warning m-1 is-size-5 uniformButton" onClick={() => handleMultiplierClick(3)}>
          Triple
        </button>
      </div>
    </>
  );
}

export default CricketGame;
