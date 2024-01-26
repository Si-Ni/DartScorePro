import { useState } from "react";
import PlayerMenu from "../../components/GameSettings/PlayerMenu";
import { LocalMultiplayerMenuProps } from "../../global/types";
import SettingsMenu from "../../components/GameSettings/SettingsMenu";

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
              <div className="buttons is-centered mt-5">
                <button className="button is-danger m-1" onClick={props.cbBackBtnClicked}>
                  Back
                </button>
                <button
                  className="button is-primary m-1"
                  onClick={handleNextForPlayerMenu}
                  disabled={props.players.length <= 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocalMultiplayerMenu;
