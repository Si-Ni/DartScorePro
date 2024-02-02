import { useEffect, useState } from "react";
import { DGameSettings, Gamemode, InAndOutMode, OnlineMultiplayerProps } from "../../global/types";
import OnlineGames from "../../components/game/OnlineGames";
import OnlineMultiplayerSettings from "./OnlineMultiplayerSettings";
import { useParams } from "react-router-dom";

function OnlineMultiplayer(props: OnlineMultiplayerProps) {
  const [players, setPlayers] = useState([props.displayUserID]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");

  const { lobbyCode } = useParams();

  useEffect(() => {
    const handleGameStarted = (gameSettings: DGameSettings) => {
      setSelectedGamemode(gameSettings.selectedGamemode);
      setSetsToWin(gameSettings.setsToWin);
      setLegsForSet(gameSettings.legsForSet);
      setModeIn(gameSettings.modeIn);
      setModeOut(gameSettings.modeOut);
      setGameStarted(true);
    };

    props.socket.on("leaderStartedGame", handleGameStarted);

    return () => {
      props.socket.off("leaderStartedGame", handleGameStarted);
    };
  }, [props.socket]);

  const nextBtnClicked = () => {
    if (props.isLobbyLeader) {
      const gameSettings: DGameSettings = {
        selectedGamemode: selectedGamemode,
        setsToWin: setsToWin,
        legsForSet: legsForSet,
        modeIn: modeIn,
        modeOut: modeOut
      };

      console.log(Boolean(props.lobbyCode), lobbyCode);
      props.socket.emit("gameStarted", {
        lobbyCode: props.lobbyCode || lobbyCode,
        gameSettings: gameSettings
      });
    }
    setGameStarted(true);
  };

  const handleBackToPlayerMenu = () => {
    setGameStarted(false);
    setSelectedGamemode("301");
  };

  const gameProps = {
    players: players,
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut
  };

  return (
    <>
      {gameStarted ? (
        <OnlineGames {...gameProps} cbBackBtnClicked={handleBackToPlayerMenu} />
      ) : (
        <OnlineMultiplayerSettings
          {...gameProps}
          setSelectedGamemode={setSelectedGamemode}
          setPlayers={setPlayers}
          socket={props.socket}
          lobbyCode={props.lobbyCode}
          isLobbyLeader={props.isLobbyLeader}
          setSetsToWin={setSetsToWin}
          setLegsForSet={setLegsForSet}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbNextBtnClicked={nextBtnClicked}
          displayUserID={props.displayUserID}
          setIsLobbyLeader={props.setIsLobbyLeader}
        />
      )}
    </>
  );
}

export default OnlineMultiplayer;
