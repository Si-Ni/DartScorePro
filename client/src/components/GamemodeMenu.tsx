import { Gamemode, GamemodeMenuProps } from "../global/types";

function GamemodeMenu(props: GamemodeMenuProps) {
  const handleMenuClick = (gamemode: Gamemode) => {
    props.cbGamemodeSelected(gamemode);
  };

  const isCurrentlySelected = (gamemode: Gamemode) => {
    return props.selectedGamemode === gamemode;
  };

  return (
    <>
      <div className="column is-flex is-justify-content-center">
        <h1 className="is-size-4 mb-3">Choose Gamemode</h1>
      </div>
      <div className="buttons is-centered">
        <button
          className="button is-primary m-1 is-large sideBySideMenuBtn"
          onClick={() => handleMenuClick("301")}
          style={{
            boxShadow: isCurrentlySelected("301") ? "inset #00574a 0px 0px 6px 1px" : "",
            background: isCurrentlySelected("301") ? "#00b197" : "#00d1b2"
          }}
        >
          301
        </button>
        <button
          className="button is-primary m-1 is-large sideBySideMenuBtn"
          onClick={() => handleMenuClick("501")}
          style={{
            boxShadow: isCurrentlySelected("501") ? "inset #00574a 0px 0px 4px 1px" : "",
            background: isCurrentlySelected("501") ? "#00b197" : "#00d1b2"
          }}
        >
          501
        </button>
      </div>
      <div className="buttons is-centered">
        <button
          className="button is-primary m-1 is-large sideBySideMenuBtn"
          onClick={() => handleMenuClick("rcl")}
          style={{
            boxShadow: isCurrentlySelected("rcl") ? "inset #00574a 0px 0px 4px 1px" : "",
            background: isCurrentlySelected("rcl") ? "#00b197" : "#00d1b2"
          }}
        >
          rCl
        </button>
        <button
          className="button is-primary m-1 is-large sideBySideMenuBtn"
          onClick={() => handleMenuClick("cri")}
          style={{
            boxShadow: isCurrentlySelected("cri") ? "inset #00574a 0px 0px 4px 1px" : "",
            background: isCurrentlySelected("cri") ? "#00b197" : "#00d1b2"
          }}
        >
          Cri
        </button>
      </div>
    </>
  );
}

export default GamemodeMenu;
