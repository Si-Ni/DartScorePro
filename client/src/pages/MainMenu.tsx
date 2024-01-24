import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import { MainMenuProps } from "../global/types";
import logo from "../assets/logo.png";

function MainMenu(props: MainMenuProps) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    props.setLoggedIn(false);
    props.setDisplayUserID("");
    navigate("/login");
  }

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <div className="column is-flex is-justify-content-center">
            <img src={logo} style={{ width: "400px" }} alt={""} />
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
