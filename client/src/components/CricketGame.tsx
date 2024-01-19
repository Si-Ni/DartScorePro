import { useState } from "react";
import { CricketGameProps, PlayerToPlayerStatsCricket } from "../global/types";
import YesNoPopUp from "./YesNoPopUp";
import PlayerScoreCardCricket from "./PlayerScoreCardCricket";
import GameInputButtons from "./GameInputButtons";

const initializePlayerStats = (players: string[]): PlayerToPlayerStatsCricket => {
  const initialPoints: PlayerToPlayerStatsCricket = {};
  players.forEach((player) => {
    initialPoints[player] = {
      score: 0,
      cricketStats: {
        20: 0,
        19: 1,
        18: 2,
        17: 3,
        16: 4,
        15: 0,
        Bull: 0,
      },
    };
  });
  return initialPoints;
};

function CricketGame(props: CricketGameProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [mulitplier, setMultiplier] = useState<number>(1);
  const [players, setPlayers] = useState<string[]>(props.players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStatsCricket>(() =>
    initializePlayerStats(props.players),
  );

  const handleScoreBtnClicked = (points: number): void => {
    updatePlayerStats(currentPlayerIndex, points);
    updateRemainingThrows();
  };

  const updateRemainingThrows = (): void => {
    const endOfTurn = throwsRemaining === 1;
    if (endOfTurn) {
      switchToNextPlayer();
    } else {
      setThrowsRemaining((throwsRemaining) => throwsRemaining - 1);
    }
  };

  const switchToNextPlayer = (): void => {
    if (currentPlayerIndex === players.length - 1) {
      setCurrentPlayerIndex(0);
      setCurrentRound((currentRound) => currentRound + 1);
    } else {
      setCurrentPlayerIndex((currentPlayerIndex) => currentPlayerIndex + 1);
    }
    setThrowsRemaining(3);
  };

  const updatePlayerStats = (playerIndex: number, points: number): void => {
    if (points === 0) return;

    const statsKey = getCricketStatsKey(points);
    const playerKey = players[playerIndex];

    const currentCricketStatus = playerStats[playerKey].cricketStats[statsKey];

    if (currentCricketStatus < 3) {
      increaseCricketStatus(playerKey, points);
    } else if (currentCricketStatus === 3) {
      increaseScoreIfPossible(playerKey, points);
    }
  };

  const getCricketStatsKey = (points: number): string => {
    return points === 50 ? "Bull" : points.toString();
  };

  const increaseCricketStatus = (playerKey: string, points: number): void => {};

  const increaseScoreIfPossible = (playerKey: string, points: number): void => {};

  const handleMultiplierClick = (multiplierValue: number): void => {
    setMultiplier(multiplierValue);
  };

  return (
    <div className="App hero is-flex is-justify-content-center is-align-items-center is-fullheight">
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to go back? All progress will be lost!"}
          cbYesClicked={props.cbReturnToMenu}
          cbNoClicked={() => setShowGoToMainMenuPopUp(false)}
        />
      )}
      <div className="is-centered">
        <p className="is-size-3 mb-3" style={{ textAlign: "center" }}>
          Round: {currentRound}
        </p>
      </div>
      <div className="columns is-centered">
        {players.map((player) => (
          <PlayerScoreCardCricket
            key={player}
            playerName={player}
            isCurrentPlayer={players[currentPlayerIndex] === player}
            score={playerStats[player].score}
            cricketStats={playerStats[player].cricketStats}
          />
        ))}
      </div>
      <div className="is-centered">
        <p className="is-size-6 mb-1" style={{ textAlign: "center" }}>
          Remaining throws: {throwsRemaining}
        </p>
      </div>
      <div className="columns is-centered">
        <div className="column">
          <div className="box">
            {
              <GameInputButtons
                values={[...Array(6).keys()].map((num) => 20 - num).concat(50)}
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
        {/* <button className="button is-danger m-1 is-size-5 uniformButton" onClick={handleUndoClick}>
          Undo
        </button> */}
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <button
            className="button is-danger m-1 is-size-5 uniformButton"
            onClick={() => {
              setShowGoToMainMenuPopUp(true);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CricketGame;
