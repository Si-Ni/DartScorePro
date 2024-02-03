import { useState } from "react";
import GamemodeSelection from "../GamemodeSelection/GamemodeSelection.tsx";
import GameSettings from "../GameSettings/GameSettings.tsx";
import NavigationButtons from "../../buttons/NavigationButtons/NavigationButtons";
import { SettingsMenuProps } from "./SettingsMenu";

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
            modeIn={props.modeIn}
            setModeIn={props.setModeIn}
            modeOut={props.modeOut}
            setModeOut={props.setModeOut}
            isError={isError}
            setIsError={setIsError}
          />
          <NavigationButtons cbBackBtnClicked={props.cbBackBtnClicked} cbNextBtnClicked={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
