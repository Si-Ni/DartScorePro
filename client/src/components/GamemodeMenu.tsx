import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import { useState } from "react";
import StandardGamemodes from "./StandardGamemodes";
import { Gamemode } from "../global/types";

function GamemodeMenu() {
  const navigate = useNavigate();
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  const handleMenuClick = (gamemode: Gamemode) => {
    setSelectedGamemode(gamemode);
  };

  return (
    <>
      {selectedGamemode != null ? (
        <div>
          {selectedGamemode === "301" && (
            <StandardGamemodes
              gamemodeTotalScore={301}
              players={["Player1"]}
              returnToMenu={() => {
                setSelectedGamemode(null);
              }}
            />
          )}
          {selectedGamemode === "501" && (
            <StandardGamemodes
              gamemodeTotalScore={501}
              players={["Player1"]}
              returnToMenu={() => {
                setSelectedGamemode(null);
              }}
            />
          )}
        </div>
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <div className="column is-flex is-justify-content-center">
                <h1 className="is-size-4 mb-3">Choose Gamemode</h1>
              </div>
              <div className="buttons is-centered">
                <button
                  className="button is-primary m-1 is-large sideBySideMenuBtn"
                  onClick={() => handleMenuClick("301")}
                >
                  301
                </button>
                <button
                  className="button is-primary m-1 is-large sideBySideMenuBtn"
                  onClick={() => handleMenuClick("501")}
                >
                  501
                </button>
              </div>
              <div className="buttons is-centered">
                <button
                  className="button is-primary m-1 is-large sideBySideMenuBtn"
                  onClick={() => handleMenuClick("rcl")}
                >
                  rCl
                </button>
                <button
                  className="button is-primary m-1 is-large sideBySideMenuBtn"
                  onClick={() => handleMenuClick("cri")}
                >
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
      )}
    </>
  );
}

export default GamemodeMenu;
