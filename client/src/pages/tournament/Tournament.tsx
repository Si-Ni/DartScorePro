import { useState } from "react";
import { Gamemode, InAndOutMode } from "../../types/global";
import LocalGames from "../../components/game/LocalGames/LocalGames.tsx";
import PlayersAndSettings from "../../components/gameSettings/PlayersAndSettings/PlayersAndSettings.tsx";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/popUps/PopUp/PopUp.tsx";

function Tournament() {
  const [allPlayers, setAllPlayers] = useState(["Player1"]);
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const [currentPlayers, setCurrentPlayers] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");
  const [endPopUpContent, setEndPopUpContent] = useState<string>("");
  const [endOfRoundPopUpContent, setEndOfRoundPopUpContent] = useState<string>("");
  const [showWinnerPopUp, setShowWinnerPopUp] = useState<boolean>(false);
  const [showEndOfRoundPopUp, setShowEndOfRoundPopUp] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBackToPlayerMenu = (): void => {
    setGameStarted(false);
    setSelectedGamemode("301");
  };

  const numberOfPlayersIsPowerOfTwo = (): boolean => {
    const playersLen = allPlayers.length;
    return playersLen > 1 && (playersLen & (playersLen - 1)) === 0;
  };

  const startGame = (): void => {
    setRemainingPlayersForNewRound(allPlayers);
    setGameStarted(true);
  };

  const chooseTwoRandomPlayers = (players: string[]): string[] => {
    if (players.length == 2) return players;

    const rangeMin = 0;
    const rangeMax = players.length - 1;

    const player1Index = getRandomNumber(rangeMin, rangeMax);
    let player2Index;

    do {
      player2Index = getRandomNumber(rangeMin, rangeMax);
    } while (player2Index === player1Index);

    return [players[player1Index], players[player2Index]];
  };

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const removePlayersFromWaitingPlayers = (playersToRemove: string[]): void => {
    const updatedPlayers = waitingPlayers.filter((player) => !playersToRemove.includes(player));
    setWaitingPlayers(updatedPlayers);
  };

  const playerWon = (winner: string): void => {
    setGameStarted(false);
    const endOfTournament = waitingPlayers.length === 0 && winners.length === 0;
    const endOfRound = waitingPlayers.length === 0;
    if (endOfTournament) {
      endTournamentAnnounceWinner(winner);
      return;
    } else if (endOfRound) {
      setRemainingPlayersForNewRound([...winners, winner]);
    } else {
      setWinnerAndNextPlayers(winner);
    }
    setShowEndOfRoundPopUp(true);
    setEndOfRoundPopUpContent(`Player: ${winner} has won this round!`);
  };

  const endTournamentAnnounceWinner = (winner: string) => {
    setEndPopUpContent(`Player: ${winner} has won the tournament!`);
    setShowWinnerPopUp(true);
  };

  const setRemainingPlayersForNewRound = (remainingPlayers: string[]) => {
    const randomPlayers = chooseTwoRandomPlayers(remainingPlayers);
    setCurrentPlayers(randomPlayers);
    const waitingPlayers = remainingPlayers.filter((player) => !randomPlayers.includes(player));
    setWaitingPlayers(waitingPlayers);
    setWinners([]);
  };

  const setWinnerAndNextPlayers = (winner: string) => {
    setWinners([...winners, winner]);
    const randomPlayers = chooseTwoRandomPlayers(waitingPlayers);
    setCurrentPlayers(randomPlayers);
    removePlayersFromWaitingPlayers(randomPlayers);
  };

  const handleEndPopUpClicked = (): void => {
    setShowWinnerPopUp(false);
    setGameStarted(false);
  };

  const nextRoundClicked = (): void => {
    setShowEndOfRoundPopUp(false);
    setGameStarted(true);
  };

  const gameProps = {
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut
  };

  return (
    <>
      {showEndOfRoundPopUp && (
        <PopUp content={endOfRoundPopUpContent} btnContent="Next round" cbBtnClicked={nextRoundClicked} />
      )}
      {showWinnerPopUp && (
        <PopUp content={endPopUpContent} btnContent="End tournament" cbBtnClicked={handleEndPopUpClicked} />
      )}
      {gameStarted ? (
        <LocalGames
          {...gameProps}
          players={currentPlayers}
          cbBackBtnClicked={handleBackToPlayerMenu}
          cbPlayerWon={playerWon}
        />
      ) : (
        <PlayersAndSettings
          {...gameProps}
          players={allPlayers}
          maxPlayers={16}
          validNumberOfPlayers={numberOfPlayersIsPowerOfTwo()}
          setSelectedGamemode={setSelectedGamemode}
          setPlayers={setAllPlayers}
          setLegsForSet={setLegsForSet}
          setSetsToWin={setSetsToWin}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbBackBtnClicked={() => navigate("/")}
          handleSettingsNextBtnClicked={startGame}
        />
      )}
    </>
  );
}

export default Tournament;
