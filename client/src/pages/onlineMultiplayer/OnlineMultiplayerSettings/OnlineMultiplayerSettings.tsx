import { useState } from "react";
import PlayerMenu from "../../../components/gameSettings/PlayerMenu/PlayerMenu.tsx";
import { useNavigate } from "react-router-dom";
import SettingsMenu from "../../../components/gameSettings/SettingsMenu/SettingsMenu.tsx";
import NavigationButtons from "../../../components/buttons/NavigationButtons/NavigationButtons.tsx";
import { OnlineMultiplayerSettingsProps } from "./OnlineMultiplayerSettings";

function OnlineMultiplayerSettings(props: OnlineMultiplayerSettingsProps) {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const handleNext = () => {
    if (props.players.length > 1) setShowSettingsMenu(true);
  };

  const handleBack = () => {
    props.socket.emit("lobby:leave");
    navigate("/multiplayer");
  };

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
