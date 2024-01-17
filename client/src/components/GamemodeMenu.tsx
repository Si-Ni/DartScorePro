import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

function GamemodeMenu() {
  const navigate = useNavigate();

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Choose Gamemode</h1>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => navigate("/301")}>
              301
            </button>
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => navigate("/501")}>
              501
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => navigate("/rcl")}>
              rCl
            </button>
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => navigate("/cri")}>
              Cri
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

export default GamemodeMenu;
