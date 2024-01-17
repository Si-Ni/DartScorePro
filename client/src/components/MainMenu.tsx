import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

function MainMenu() {
  const navigate = useNavigate();

  function logout() {
    navigate("/login");
  }

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Main Menu</h1>
          </div>
          <div className="buttons is-centered">
            <button className="button is-primary m-1 is-large is-fullwidth" onClick={() => navigate("/singleplayer")}>
              Singleplayer
            </button>
            <button className="button is-primary m-1 is-large is-fullwidth" onClick={() => navigate("/multiplayer")}>
              Mulitplayer
            </button>
          </div>
          <div className="buttons is-centered">
            <button
              className="button is-primary m-1 is-large sideBySideMenuBtn"
              onClick={() => navigate("/statistics")}
            >
              Statistics
            </button>
            <button className="button is-primary m-1 is-large sideBySideMenuBtn" onClick={() => navigate("/settings")}>
              Settings
            </button>
          </div>
          <div className="buttons is-centered">
            <button className="button is-danger m-1 is-large" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;