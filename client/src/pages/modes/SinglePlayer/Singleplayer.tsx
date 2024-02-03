import "../../../styles/Menu.css";
import { useState } from "react";
import { Gamemode, InAndOutMode } from "../../../types/global";
import LocalGames from "../../../components/game/LocalGames/LocalGames.tsx";
import { useNavigate } from "react-router-dom";
import SettingsMenu from "../../../components/gameSettings/SettingsMenu/SettingsMenu.tsx";

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

  const gameProps = {
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut
  };

  return (
    <>
      {gameStarted ? (
        <LocalGames {...gameProps} players={["Player1"]} cbBackBtnClicked={backBtnGameClicked} />
      ) : (
        <SettingsMenu
          {...gameProps}
          setSelectedGamemode={setSelectedGamemode}
          setSetsToWin={setSetsToWin}
          setLegsForSet={setLegsForSet}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbBackBtnClicked={backBtnClicked}
          cbNextBtnClicked={nextBtnClicked}
        />
      )}
    </>
  );
}

export default Singleplayer;
