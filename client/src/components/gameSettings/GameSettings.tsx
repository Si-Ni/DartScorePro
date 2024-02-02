import { InAndOutMode } from "../../types/global";
import { GameSettingsProps } from "../../types/GameSettings";
import { ChangeEvent } from "react";

function GameSettings(props: GameSettingsProps) {
  const handleInputChangeSets = (event: ChangeEvent<HTMLInputElement>) => {
    props.setIsError(false);
    props.setSetsToWin(parseInt(event.target.value, 10));
  };

  const handleInputChangeLegs = (event: ChangeEvent<HTMLInputElement>) => {
    props.setIsError(false);
    props.setLegsForSet(parseInt(event.target.value, 10));
  };

  const handleCheckboxModeInChange = (mode: InAndOutMode) => {
    props.setModeIn(mode);
  };

  const handleCheckboxModeOutChange = (mode: InAndOutMode) => {
    props.setModeOut(mode);
  };

  return (
    <div style={{ minWidth: "300px" }}>
      <div className="column is-flex is-justify-content-center">
        <h1 className="is-size-4 mb-1">Settings</h1>
      </div>
      <div className="column is-flex is-justify-content-center pb-2 pt-0">
        <h1 className="is-size-5">First to:</h1>
      </div>
      <div className="column mt-0 pt-0">
        <div className="is-flex is-justify-content-center mb-3">
          <div
            className="field is-grouped is-justify-content-space-between"
            style={{ minWidth: "140px", width: "60%" }}
          >
            <p className="mr-4" style={{ lineHeight: "40px" }}>
              Sets:
            </p>
            <div className="control" style={{ width: "60%" }}>
              <input
                className="input"
                type="number"
                min="1"
                max="20"
                value={props.setsToWin}
                onChange={handleInputChangeSets}
                placeholder="Enter sets"
              />
            </div>
          </div>
        </div>
        <div className="is-flex is-justify-content-center">
          <div
            className="field is-grouped is-justify-content-space-between"
            style={{ minWidth: "140px", width: "60%" }}
          >
            <p className="mr-4" style={{ lineHeight: "40px" }}>
              Legs:
            </p>
            <div className="control" style={{ width: "60%" }}>
              <input
                className="input"
                type="number"
                min="1"
                max="10"
                value={props.legsForSet}
                onChange={handleInputChangeLegs}
                placeholder="Enter legs"
              />
            </div>
          </div>
        </div>
        {props.isError && (
          <p className="has-text-danger mt-2" style={{ textAlign: "center" }}>
            Invalid input
          </p>
        )}
      </div>
      {(props.selectedGamemode === "301" || props.selectedGamemode === "501") && (
        <>
          <div className="columns is-flex mt-3">
            <div className="column ml-2">
              <label className="checkbox">
                <input
                  className="checkbox mr-2"
                  type="checkbox"
                  checked={props.modeIn === "straight"}
                  onChange={() => handleCheckboxModeInChange("straight")}
                />
                Straight In
              </label>
            </div>
            <div className="column">
              <label className="checkbox">
                <input
                  className="checkbox mr-2"
                  type="checkbox"
                  checked={props.modeIn === "double"}
                  onChange={() => handleCheckboxModeInChange("double")}
                />
                Double In
              </label>
            </div>
          </div>
          <div className="columns is-flex">
            <div className="column ml-2">
              <label className="checkbox">
                <input
                  className="checkbox mr-2"
                  type="checkbox"
                  checked={props.modeOut === "straight"}
                  onChange={() => handleCheckboxModeOutChange("straight")}
                />
                Straight Out
              </label>
            </div>
            <div className="column">
              <label className="checkbox">
                <input
                  className="checkbox mr-2"
                  type="checkbox"
                  checked={props.modeOut === "double"}
                  onChange={() => handleCheckboxModeOutChange("double")}
                />
                Double Out
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default GameSettings;
