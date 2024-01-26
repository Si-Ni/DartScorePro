import { useState } from "react";
import { Gamemode, OnlineMultiplayerProps } from "../../global/types";
import Games from "../../components/Game/Games";
import OnlineMultiplayerMenu from "./OnlineMultiplayerSettings";

function OnlineMultiplayer(props: OnlineMultiplayerProps) {
  const [players, setPlayers] = useState([props.displayUserID]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);

  const nextBtnClicked = () => {
    if (props.isLobbyLeader)
      props.socket.emit("gamemodeSelected", { lobbyCode: props.lobbyCode, gamemode: selectedGamemode });
    setGameStarted(true);
  };

  const handleBackToPlayerMenu = () => {
    setGameStarted(false);
    setSelectedGamemode("301");
  };

  return (
    <>
      {gameStarted ? (
        <Games
          selectedGamemode={selectedGamemode}
          players={players}
          cbBackBtnClicked={handleBackToPlayerMenu}
          setsToWin={setsToWin}
          legsForSet={legsForSet}
        />
      ) : (
        <OnlineMultiplayerMenu
          selectedGamemode={selectedGamemode}
          setSelectedGamemode={setSelectedGamemode}
          players={players}
          setPlayers={setPlayers}
          socket={props.socket}
          lobbyCode={props.lobbyCode}
          isLobbyLeader={props.isLobbyLeader}
          setsToWin={setsToWin}
          setSetsToWin={setSetsToWin}
          legsForSet={legsForSet}
          setLegsForSet={setLegsForSet}
          cbNextBtnClicked={nextBtnClicked}
        />
      )}
    </>
  );
}

export default OnlineMultiplayer;
