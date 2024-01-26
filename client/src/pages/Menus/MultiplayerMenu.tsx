import { useNavigate } from "react-router-dom";
import { MultiplayerModeProps, MultiplayerMode } from "../../global/types";

function MultiplayerMenu(props: MultiplayerModeProps) {
  const navigate = useNavigate();

  const handleMenuClick = (mode: MultiplayerMode) => {
    props.cbMultiplayerModeSelected(mode);
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Choose Mulitplayer Mode</h1>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large is-fullwidth" onClick={() => handleMenuClick("local")}>
              Local Multiplayer
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large is-fullwidth" onClick={() => handleMenuClick("create")}>
              Create Lobby
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large is-fullwidth" onClick={() => handleMenuClick("join")}>
              Join
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-danger m-1 is-large" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiplayerMenu;
