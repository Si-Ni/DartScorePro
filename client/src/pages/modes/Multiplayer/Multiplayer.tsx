import { useState } from "react";
import { MultiplayerMode } from "../../../types/global";
import MultiplayerMenu from "../../menus/MultiplayerMenu/MultiplayerMenu.tsx";
import LocalMultiplayer from "../../localMultiplayer/LocalMultiplayer.tsx";
import JoinLobby from "../../onlineMultiplayer/JoinLobby/JoinLobby.tsx";
import CreateLobby from "../../onlineMultiplayer/CreateLobby/CreateLobby.tsx";
import { MultiplayerProps } from "./Multiplayer";

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
