import { useState } from "react";
import { Gamemode, InAndOutMode, OnlineMultiplayerProps } from "../../global/types";
import Games from "../../components/game/Games";
import OnlineMultiplayerSettings from "./OnlineMultiplayerSettings";

function OnlineMultiplayer(props: OnlineMultiplayerProps) {
  const [players, setPlayers] = useState([props.displayUserID]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");

  const nextBtnClicked = () => {
    if (props.isLobbyLeader)
      props.socket.emit("gamemodeSelected", { lobbyCode: props.lobbyCode, gamemode: selectedGamemode });
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
        <Games {...gameProps} cbBackBtnClicked={handleBackToPlayerMenu} />
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
        />
      )}
    </>
  );
}

export default OnlineMultiplayer;
