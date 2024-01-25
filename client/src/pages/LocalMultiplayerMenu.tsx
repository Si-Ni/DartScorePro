import { useState } from "react";
import GamemodeMenu from "../components/GamemodeMenu";
import PlayerMenu from "../components/PlayerMenu";
import { LocalMultiplayerMenuProps } from "../global/types";
import GameSettings from "../components/GameSettings";

function LocalMultiplayerMenu(props: LocalMultiplayerMenuProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const invalidSetsLegsInput = (): boolean => {
    return props.setsToWin < 1 || props.setsToWin > 20 || props.legsForSet < 1 || props.legsForSet > 10;
  };

  const handleNext = () => {
    if (props.players.length > 1) setShowSettingsMenu(true);
  };

  const handleSettingsNext = () => {
    if (invalidSetsLegsInput()) {
      setIsError(true);
      return;
    }
    props.handleSettingsNext();
  };

  return (
    <>
      {showSettingsMenu ? (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <GamemodeMenu selectedGamemode={props.selectedGamemode} cbGamemodeSelected={props.cbGamemodeSelected} />
              <GameSettings
                selectedGamemode={props.selectedGamemode}
                setsToWin={props.setsToWin}
                setSetsToWin={props.setSetsToWin}
                legsForSet={props.legsForSet}
                setLegsForSet={props.setLegsForSet}
                isError={isError}
                setIsError={setIsError}
              />
              <div className="buttons is-centered mt-4">
                <button className="button is-danger m-1 is-medium" onClick={() => setShowSettingsMenu(false)}>
                  Back
                </button>
                <button className="button is-primary m-1 is-medium" onClick={handleSettingsNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <PlayerMenu players={props.players} setPlayers={props.setPlayers} isEditable={true} />
              <div className="buttons is-centered mt-5">
                <button className="button is-danger m-1" onClick={props.cbBackBtnClicked}>
                  Back
                </button>
                <button className="button is-primary m-1" onClick={handleNext} disabled={props.players.length <= 1}>
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
