import { useState } from "react";
import { MultiplayerMode } from "../global/types";
import MultiplayerMenu from "./MultiplayerMenu";
import LocalMultiplayer from "./LocalMultiplayer";
import JoinLobby from "./JoinLobby";
import CreateLobby from "./CreateLobby";

function Multiplayer({ socket }) {
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
            />
          )}
          {selectedMultiplayerMode === "join" && (
            <JoinLobby
              cbBackBtnClicked={() => {
                setSelectedMultiplayerMode(null);
              }}
              socket={socket}
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
