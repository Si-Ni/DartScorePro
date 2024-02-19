import { useNavigate } from "react-router-dom";
import { MultiplayerMode } from "../../../types/global";
import NavigationButtons from "../../../components/buttons/NavigationButtons/NavigationButtons.tsx";
import { MultiplayerModeProps } from "./MultiplayerMenu";
import ErrorMessageBoxButton from "../../../components/buttons/ErrorMessageBoxButton/ErrorMessageBoxButton.tsx";

function MultiplayerMenu(props: MultiplayerModeProps) {
  const navigate = useNavigate();

  const handleMenuClick = (mode: MultiplayerMode) => {
    props.cbMultiplayerModeSelected(mode);
  };

  const errorMessageBoxButtonProps = {
    disabled: !props.isLoggedIn,
    messageContent: "Log in to access",
    className: "button is-primary m-1 is-large is-fullwidth"
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
            <ErrorMessageBoxButton
              {...errorMessageBoxButtonProps}
              btnContent="Create Lobby"
              cbBtnClicked={() => handleMenuClick("create")}
            />
          </div>
          <div className="buttons is-centered">
            <ErrorMessageBoxButton
              {...errorMessageBoxButtonProps}
              cbBtnClicked={() => handleMenuClick("join")}
              btnContent="Join Lobby"
            />
          </div>
          <NavigationButtons cbBackBtnClicked={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default MultiplayerMenu;
