import "../../styles/Menu.css";
import { useState } from "react";
import { Gamemode, InAndOutMode } from "../../global/types";
import Games from "../../components/game/Games";
import { useNavigate } from "react-router-dom";
import SettingsMenu from "../../components/gameSettings/SettingsMenu";

function Singleplayer() {
  const navigate = useNavigate();
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");

  const backBtnClicked = () => navigate("/");

  const nextBtnClicked = () => setGameStarted(true);

  const backBtnGameClicked = () => setGameStarted(false);

  return (
    <>
      {gameStarted ? (
        <Games
          selectedGamemode={selectedGamemode}
          players={["Player1"]}
          cbBackBtnClicked={backBtnGameClicked}
          setsToWin={setsToWin}
          legsForSet={legsForSet}
          modeIn={modeIn}
          modeOut={modeOut}
        />
      ) : (
        <SettingsMenu
          selectedGamemode={selectedGamemode}
          setSelectedGamemode={setSelectedGamemode}
          setsToWin={setsToWin}
          setSetsToWin={setSetsToWin}
          legsForSet={legsForSet}
          setLegsForSet={setLegsForSet}
          modeIn={modeIn}
          setModeIn={setModeIn}
          modeOut={modeOut}
          setModeOut={setModeOut}
          cbBackBtnClicked={backBtnClicked}
          cbNextBtnClicked={nextBtnClicked}
        />
      )}
    </>
  );
}

export default Singleplayer;
