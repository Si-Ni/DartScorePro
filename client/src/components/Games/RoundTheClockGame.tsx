import { useState } from "react";
import { PlayerToPlayerStatsRCl, RoundTheClockGameProps } from "../../global/types";
import PlayerScoreCard from "../PlayerScoreCards/PlayerScoreCard";

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

function RoundTheClockGame({ throwsRemaining, currentPlayerIndex, ...props }: RoundTheClockGameProps) {
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
    <>
      <div className="is-centered">
        <p className="is-size-3 mb-6" style={{ textAlign: "center" }}>
          Round: {props.currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {players.map((player) => (
          <PlayerScoreCard
            key={player}
            playerName={player}
            isStartingPlayer={players[props.startingPlayerIndex] === player}
            isCurrentPlayer={players[currentPlayerIndex] === player}
            score={playerStats[player].currentTarget}
            lastThrows={playerStats[player].lastThrows}
            sets={props.playerTotalGameStats[player].sets}
            legs={props.playerTotalGameStats[player].legs}
          />
        ))}
      </div>
      <div className="columns is-centered mt-6">
        <button className="button is-success m-1 is-size-5 uniformButton" onClick={handleHitClicked}>
          Hit
        </button>
        <button className="button is-danger m-1 is-size-5 uniformButton" onClick={handleMissClicked}>
          Miss
        </button>
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <button className="button is-warning m-1 is-size-5" style={{ width: "150px" }} onClick={handleNextClicked}>
            Skip Player
          </button>
        </div>
      </div>
    </>
  );
}

export default RoundTheClockGame;
