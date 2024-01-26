import { GameSettingsProps } from "../../global/types";

function GameSettings(props: GameSettingsProps) {
  const handleInputChangeSets = (event: any) => {
    props.setIsError(false);
    props.setSetsToWin(event.target.value);
  };

  const handleInputChangeLegs = (event: any) => {
    props.setIsError(false);
    props.setLegsForSet(event.target.value);
  };

  return (
    <div className="">
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
    </div>
  );
}
export default GameSettings;
