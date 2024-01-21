import { Gamemode, GamemodeMenuProps } from "../global/types";

function GamemodeMenu(props: GamemodeMenuProps) {
  const handleMenuClick = (gamemode: Gamemode) => {
    props.cbGamemodeSelected(gamemode);
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Choose Gamemode</h1>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => handleMenuClick("301")}>
              301
            </button>
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => handleMenuClick("501")}>
              501
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => handleMenuClick("rcl")}>
              rCl
            </button>
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => handleMenuClick("cri")}>
              Cri
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-danger m-1 is-large" onClick={props.cbBackBtnClicked}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamemodeMenu;
