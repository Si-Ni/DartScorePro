import { useState } from "react";
import PlayerMenu from "./PlayerMenu";
import SettingsMenu from "./SettingsMenu";
import NavigationButtons from "../buttons/NavigationButtons";
import { PlayersAndSettingsProps } from "../../types/PlayerAndSettings";

function PlayersAndSettings(props: PlayersAndSettingsProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const handleNextForPlayerMenu = () => {
    if (props.validNumberOfPlayers) setShowSettingsMenu(true);
  };

  const settingsBackBtnClicked = () => {
    setShowSettingsMenu(false);
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
          cbBackBtnClicked={settingsBackBtnClicked}
          cbNextBtnClicked={props.handleSettingsNextBtnClicked}
          modeIn={props.modeIn}
          setModeIn={props.setModeIn}
          modeOut={props.modeOut}
          setModeOut={props.setModeOut}
        />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <PlayerMenu
                players={props.players}
                maxPlayers={props.maxPlayers}
                setPlayers={props.setPlayers}
                isEditable={true}
              />
              <NavigationButtons
                cbBackBtnClicked={props.cbBackBtnClicked}
                cbNextBtnClicked={handleNextForPlayerMenu}
                nextBtnDisabled={!props.validNumberOfPlayers}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlayersAndSettings;
