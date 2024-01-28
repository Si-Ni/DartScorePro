// OnlineMultiplayerSettings.js

import { useEffect, useState } from "react";
import PlayerMenu from "../../components/gameSettings/PlayerMenu";
import { Gamemode, OnlineMultiplayerSettingsProps } from "../../global/types";
import { useNavigate, useParams } from "react-router-dom";
import SettingsMenu from "../../components/gameSettings/SettingsMenu";
import NavigationButtons from "../../components/buttons/NavigationButtons";

function OnlineMultiplayerSettings(props: OnlineMultiplayerSettingsProps) {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const { lobbyCode } = useParams();

  useEffect(() => {
    if (lobbyCode && props.displayUserID) {
      console.log(props.displayUserID);

      props.socket.emit("joinLobby", { lobbyCode: lobbyCode, userID: props.displayUserID });
    }
  }, [lobbyCode, props.socket, props.displayUserID]);

  const handleNext = () => {
    if (props.players.length > 1) setShowSettingsMenu(true);
  };

  const handleBack = () => {
    props.socket.emit("leaveLobby");
    navigate("/multiplayer");
  };

  useEffect(() => {
    props.socket.emit("joinedSuccessfully", props.lobbyCode);

    const handleSetPlayerList = (players: string[]) => {
      console.log("updateplayerlist", players);
      props.setPlayers(players);
    };

    const handleGamemodeSelected = (gamemode: Gamemode) => {
      props.setSelectedGamemode(gamemode);
    };

    props.socket.on("updatePlayersList", handleSetPlayerList);

    props.socket.on("leaderSelectedGamemode", handleGamemodeSelected);

    return () => {
      props.socket.off("updatePlayersList", handleSetPlayerList);
      props.socket.off("leaderSelectedGamemode", handleGamemodeSelected);
    };
  }, [props.socket, props.setPlayers]);

  return (
    <>
      {showSettingsMenu ? (
        <SettingsMenu
          selectedGamemode={props.selectedGamemode}
          setSelectedGamemode={props.setSelectedGamemode}
          setsToWin={props.setsToWin}
          setSetsToWin={props.setSetsToWin}
          legsForSet={props.legsForSet}
          setLegsForSet={props.setLegsForSet}
          cbBackBtnClicked={() => setShowSettingsMenu(false)}
          cbNextBtnClicked={props.cbNextBtnClicked}
        />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <PlayerMenu players={props.players} setPlayers={props.setPlayers} isEditable={false} />
              <NavigationButtons
                cbBackBtnClicked={handleBack}
                cbNextBtnClicked={props.isLobbyLeader ? handleNext : undefined}
                nextBtnDisabled={props.players.length <= 1}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OnlineMultiplayerSettings;
