// OnlineMultiplayerSettings.js

import { useEffect, useState } from "react";
import PlayerMenu from "../../components/gameSettings/PlayerMenu";
import { OnlineMultiplayerSettingsProps } from "../../global/types";
import { useNavigate, useParams } from "react-router-dom";
import SettingsMenu from "../../components/gameSettings/SettingsMenu";
import NavigationButtons from "../../components/buttons/NavigationButtons";

function OnlineMultiplayerSettings(props: OnlineMultiplayerSettingsProps) {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const { lobbyCode } = useParams();

  useEffect(() => {
    if (lobbyCode && props.displayUserID) {
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
    const handleSetPlayerList = (players: { userID: string; isLeader: boolean }[]) => {
      const isLeader = players.find((player) => player.userID === props.displayUserID && player.isLeader);

      props.setPlayers(players.map((player) => player.userID));

      isLeader && props.setIsLobbyLeader(true);
    };

    props.socket.on("updatePlayersList", handleSetPlayerList);

    props.socket.on("isGameStarted", () => props.setGameStarted(true));

    return () => {
      props.socket.off("updatePlayersList", handleSetPlayerList);
    };
  }, [props.socket, props.setPlayers, props.displayUserID]);

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
          modeIn={props.modeIn}
          setModeIn={props.setModeIn}
          modeOut={props.modeOut}
          setModeOut={props.setModeOut}
          cbBackBtnClicked={() => setShowSettingsMenu(false)}
          cbNextBtnClicked={props.cbNextBtnClicked}
        />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <PlayerMenu players={props.players} maxPlayers={4} setPlayers={props.setPlayers} isEditable={false} />
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
