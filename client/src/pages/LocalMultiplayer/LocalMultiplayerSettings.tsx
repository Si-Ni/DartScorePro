import { useState } from "react";
import PlayerMenu from "../../components/gameSettings/PlayerMenu";
import { LocalMultiplayerMenuProps } from "../../global/types";
import SettingsMenu from "../../components/gameSettings/SettingsMenu";
import NavigationButtons from "../../components/buttons/NavigationButtons";

function LocalMultiplayerMenu(props: LocalMultiplayerMenuProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const handleNextForPlayerMenu = () => {
    if (props.players.length > 1) setShowSettingsMenu(true);
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
        />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <PlayerMenu players={props.players} setPlayers={props.setPlayers} isEditable={true} />
              <NavigationButtons
                cbBackBtnClicked={props.cbBackBtnClicked}
                cbNextBtnClicked={handleNextForPlayerMenu}
                nextBtnDisabled={props.players.length <= 1}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocalMultiplayerMenu;
