import { useState } from "react";
import { MultiplayerMode, MultiplayerProps } from "../../global/types";
import MultiplayerMenu from "../menus/MultiplayerMenu";
import LocalMultiplayer from "../localMultiplayer/LocalMultiplayer";
import JoinLobby from "../onlineMultiplayer/JoinLobby";
import CreateLobby from "../onlineMultiplayer/CreateLobby";

function Multiplayer({ socket, setLobbyCode, setIsLobbyLeader, displayUserID }: MultiplayerProps) {
  const [selectedMultiplayerMode, setSelectedMultiplayerMode] = useState<MultiplayerMode | null>(null);

  return (
    <>
      {selectedMultiplayerMode ? (
        <div>
          {selectedMultiplayerMode === "local" && (
            <LocalMultiplayer
              cbBackBtnClicked={() => {
                setSelectedMultiplayerMode(null);
              }}
            />
          )}
          {selectedMultiplayerMode === "create" && (
            <CreateLobby
              cbBackBtnClicked={() => {
                setSelectedMultiplayerMode(null);
              }}
              socket={socket}
              setLobbyCodeGlobal={setLobbyCode}
              setIsLobbyLeader={setIsLobbyLeader}
              displayUserID={displayUserID}
            />
          )}
          {selectedMultiplayerMode === "join" && (
            <JoinLobby
              cbBackBtnClicked={() => {
                setSelectedMultiplayerMode(null);
              }}
              socket={socket}
              setLobbyCodeGlobal={setLobbyCode}
              displayUserID={displayUserID}
            />
          )}
        </div>
      ) : (
        <MultiplayerMenu cbMultiplayerModeSelected={setSelectedMultiplayerMode} />
      )}
    </>
  );
}

export default Multiplayer;
