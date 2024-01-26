import { useState } from "react";
import GameSettings from "./GameSettings";
import GamemodeSelection from "./GamemodeSelection";
import { SettingsMenuProps } from "../../global/types";

function SettingsMenu(props: SettingsMenuProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const invalidSetsLegsInput = (): boolean => {
    return props.setsToWin < 1 || props.setsToWin > 20 || props.legsForSet < 1 || props.legsForSet > 10;
  };

  const handleNext = () => {
    if (invalidSetsLegsInput()) {
      setIsError(true);
      return;
    }
    props.cbNextBtnClicked();
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <GamemodeSelection
            selectedGamemode={props.selectedGamemode}
            setSelectedGamemode={props.setSelectedGamemode}
          />
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
            <button className="button is-danger m-1 is-medium" onClick={props.cbBackBtnClicked}>
              Back
            </button>
            <button className="button is-primary m-1 is-medium" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
