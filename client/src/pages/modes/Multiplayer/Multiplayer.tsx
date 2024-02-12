import { useState } from "react";
import { MultiplayerMode } from "../../../types/global";
import MultiplayerMenu from "../../menus/MultiplayerMenu/MultiplayerMenu.tsx";
import LocalMultiplayer from "../../localMultiplayer/LocalMultiplayer.tsx";
import JoinLobby from "../../onlineMultiplayer/JoinLobby/JoinLobby.tsx";
import CreateLobby from "../../onlineMultiplayer/CreateLobby/CreateLobby.tsx";
import { MultiplayerProps } from "./Multiplayer";

function Multiplayer(props: MultiplayerProps) {
  const [selectedMultiplayerMode, setSelectedMultiplayerMode] = useState<MultiplayerMode | null>(null);

  const handleBackBtnClicked = () => {
    props.setLobbyCode("");
    setSelectedMultiplayerMode(null);
  };

  const lobbyProps = {
    socket: props.socket,
    lobbyCode: props.lobbyCode,
    setLobbyCode: props.setLobbyCode,
    displayUserID: props.displayUserID,
    cbBackBtnClicked: handleBackBtnClicked
  };

  return (
    <>
      {selectedMultiplayerMode ? (
        <div>
          {selectedMultiplayerMode === "local" && <LocalMultiplayer cbBackBtnClicked={handleBackBtnClicked} />}
          {selectedMultiplayerMode === "create" && (
            <CreateLobby {...lobbyProps} setIsLobbyLeader={props.setIsLobbyLeader} />
          )}
          {selectedMultiplayerMode === "join" && <JoinLobby {...lobbyProps} />}
        </div>
      ) : (
        <MultiplayerMenu isLoggedIn={props.isLoggedIn} cbMultiplayerModeSelected={setSelectedMultiplayerMode} />
      )}
    </>
  );
}

export default Multiplayer;
