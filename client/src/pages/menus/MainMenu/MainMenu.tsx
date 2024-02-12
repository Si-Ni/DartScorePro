import { useNavigate } from "react-router-dom";
import "../../../styles/Menu.css";
import logo from "../../../assets/logo.svg";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { MainMenuProps } from "./MainMenu";
import ErrorMessageBoxButton from "../../../components/buttons/ErrorMessageBoxButton/ErrorMessageBoxButton.tsx";
import axios from "../../../api/axios";

const LOGOUT_URL = "/logout";
function MainMenu(props: MainMenuProps) {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    axios
      .post(
        LOGOUT_URL,
        {},
        {
          withCredentials: true
        }
      )
      .then(() => {
        props.setLoggedIn(false);
        props.setDisplayUserID("");
        setAuth({});
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  const errorMessageBoxButtonProps = {
    className: "button is-primary m-1 is-large sideBySideMenuBtn",
    messageContent: "Log in to access",
    disabled: !props.isLoggedIn
  };

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
            <button className="button is-primary m-1 is-large is-fullwidth" onClick={() => navigate("/tournament")}>
              Tournament
            </button>
            <button
              className="button is-primary m-1 is-large is-fullwidth"
              onClick={() => navigate("/checkoutCalculator")}
            >
              Checkouts
            </button>
          </div>
          <div className="buttons is-centered">
            <ErrorMessageBoxButton
              cbBtnClicked={() => navigate("/statistics")}
              btnContent="Statistics"
              {...errorMessageBoxButtonProps}
            />
            <ErrorMessageBoxButton
              cbBtnClicked={() => navigate("/settings")}
              btnContent="Settings"
              {...errorMessageBoxButtonProps}
            />
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
