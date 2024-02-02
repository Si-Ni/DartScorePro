import { OnlineStandardGamesProps, PlayerToPlayerStats, PlayerToPlayerTotalGameStats } from "../../global/types";
import StandardGamesView from "../gamemodeViews/StandardGamesView";

const initializePlayerStats = (players: string[], gamemodeTotalScore: number): PlayerToPlayerStats => {
  const initialPoints: PlayerToPlayerStats = {};
  players.forEach((player) => {
    initialPoints[player] = {
      score: gamemodeTotalScore,
      scoreAtBeginningOfRound: gamemodeTotalScore,
      average: 0,
      dartsThrown: 0,
      totalScore: 0,
      turns: 0,
      lastThrows: [],
      throwsRemaining: 0,
      checkoutOptions: []
    };
  });
  return initialPoints;
};

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

function OnlineStandardGames(props: OnlineStandardGamesProps) {
  return (
    <StandardGamesView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={0}
      currentPlayerIndex={0}
      playerTotalGameStats={initializePlayerTotalGameStats(props.players)}
      playerStats={initializePlayerStats(props.players, 301)}
      cbHandleScoreBtnClicked={() => {}}
      multiplier={props.multiplier}
      cbHandleMultiplierClicked={() => {}}
    />
  );
}

export default OnlineStandardGames;
