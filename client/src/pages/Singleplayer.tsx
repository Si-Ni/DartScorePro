import "../styles/Menu.css";
import { useState } from "react";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";
import Games from "../components/Games";
import { useNavigate } from "react-router-dom";
import GameSettings from "../components/GameSettings";

function Singleplayer() {
  const navigate = useNavigate();
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);

  const validateSetsLegsInput = (): boolean => {
    return setsToWin < 1 || setsToWin > 20 || legsForSet < 1 || legsForSet > 10;
  };

  const handleNext = () => {
    if (validateSetsLegsInput()) {
      setIsError(true);
      return;
    }
    setGameStarted(true);
  };

  return (
    <>
      {gameStarted ? (
        <Games
          selectedGamemode={selectedGamemode}
          players={["Player1"]}
          cbBackBtnClicked={() => {
            setGameStarted(false);
          }}
        />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <GamemodeMenu selectedGamemode={selectedGamemode} cbGamemodeSelected={setSelectedGamemode} />
              <GameSettings
                selectedGamemode={selectedGamemode}
                setsToWin={setsToWin}
                setSetsToWin={setSetsToWin}
                legsForSet={legsForSet}
                setLegsForSet={setLegsForSet}
                isError={isError}
                setIsError={setIsError}
              />
              <div className="buttons is-centered mt-4">
                <button className="button is-danger m-1 is-medium" onClick={() => navigate("/")}>
                  Back
                </button>
                <button className="button is-primary m-1 is-medium" onClick={handleNext}>
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

export default Singleplayer;
