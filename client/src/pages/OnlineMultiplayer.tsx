import { useState } from "react";
import { Gamemode, OnlineMultiplayerProps } from "../global/types";
import Games from "../components/Games";
import OnlineMultiplayerMenu from "./OnlineMultiplayerMenu";

function OnlineMultiplayer(props: OnlineMultiplayerProps) {
  const [players, setPlayers] = useState([props.displayUserID]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  const handleGamemodeSelected = (gamemode: Gamemode) => {
    setSelectedGamemode(gamemode);
  };

  const handleBackToPlayerMenu = () => {
    setSelectedGamemode(null);
  };

  return (
    <>
      {selectedGamemode ? (
        <Games selectedGamemode={selectedGamemode} players={players} cbBackBtnClicked={handleBackToPlayerMenu} />
      ) : (
        <OnlineMultiplayerMenu
          cbGamemodeSelected={handleGamemodeSelected}
          players={players}
          setPlayers={setPlayers}
          socket={props.socket}
          lobbyCode={props.lobbyCode}
          isLobbyLeader={props.isLobbyLeader}
        />
      )}
    </>
  );
}

export default OnlineMultiplayer;
