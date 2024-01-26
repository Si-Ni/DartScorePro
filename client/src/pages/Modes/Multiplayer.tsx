import { useState } from "react";
import { MultiplayerMode, MultiplayerProps } from "../../global/types";
import MultiplayerMenu from "../Menus/MultiplayerMenu";
import LocalMultiplayer from "../LocalMultiplayer/LocalMultiplayer";
import JoinLobby from "../OnlineMultiplayer/JoinLobby";
import CreateLobby from "../OnlineMultiplayer/CreateLobby";

function Multiplayer({ socket, setLobbyCode, setIsLobbyLeader }: MultiplayerProps) {
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
            />
          )}
          {selectedMultiplayerMode === "join" && (
            <JoinLobby
              cbBackBtnClicked={() => {
                setSelectedMultiplayerMode(null);
              }}
              socket={socket}
              setLobbyCodeGlobal={setLobbyCode}
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
