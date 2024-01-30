import { useState } from "react";
import { Gamemode, InAndOutMode } from "../../global/types";
import Games from "../../components/game/Games";
import PlayersAndSettings from "../../components/gameSettings/PlayersAndSettings";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/popUps/PopUp";

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
    const randomPlayers = chooseTwoRandomPlayers(allPlayers);
    setCurrentPlayers(randomPlayers);
    const waitingPlayers = allPlayers.filter((player) => !randomPlayers.includes(player));
    setWaitingPlayers(waitingPlayers);
    setWinners([]);
    setGameStarted(true);
  };

  const chooseTwoRandomPlayers = (players: string[]): string[] => {
    if (players.length == 2) return players;

    const rangeMin = 0;
    const rangeMax = players.length - 1;

    let player1Index = getRandomNumber(rangeMin, rangeMax);
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

  const playerWon = (player: string): void => {
    setGameStarted(false);
    console.log(waitingPlayers);
    if (waitingPlayers.length === 0 && winners.length === 0) {
      console.log("test4");
      setEndPopUpContent(`Player: ${player} has won the tournament!`);
      setShowWinnerPopUp(true);
      return;
    } else if (waitingPlayers.length === 0) {
      const playersInNextRound = [...winners, player];
      const randomPlayers = chooseTwoRandomPlayers(playersInNextRound);
      setWaitingPlayers(playersInNextRound.filter((player) => !randomPlayers.includes(player)));
      setCurrentPlayers(randomPlayers);
      setWinners([]);
    } else {
      setWinners([...winners, player]);
      const randomPlayers = chooseTwoRandomPlayers(waitingPlayers);
      setCurrentPlayers(randomPlayers);
      removePlayersFromWaitingPlayers(randomPlayers);
    }
    setShowEndOfRoundPopUp(true);
    setEndOfRoundPopUpContent(`Player: ${player} has won this round!`);
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
        <Games
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
