import { useState } from "react";
import GamemodeMenu from "../components/GamemodeMenu";
import PlayerMenu from "../components/PlayerMenu";
import { LocalMultiplayerMenuProps } from "../global/types";

function LocalMultiplayerMenu(props: LocalMultiplayerMenuProps) {
  const [showGamemodeMenu, setShowGamemodeMenu] = useState<boolean>(false);

  const handleNext = () => {
    if (props.players.length > 1) setShowGamemodeMenu(true);
  };

  return (
    <>
      {showGamemodeMenu ? (
        <GamemodeMenu
          cbGamemodeSelected={props.cbGamemodeSelected}
          cbBackBtnClicked={() => setShowGamemodeMenu(false)}
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
