import { useState } from "react";
import { Gamemode, LocalMultiplayerProps } from "../global/types";
import Games from "../components/Games";
import LocalMultiplayerMenu from "./LocalMultiplayerMenu";

function LocalMultiplayer(props: LocalMultiplayerProps) {
  const [players, setPlayers] = useState(["Player1"]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);

  const handleGamemodeSelected = (gamemode: Gamemode) => {
    setSelectedGamemode(gamemode);
  };

  const handleBackToPlayerMenu = () => {
    setGameStarted(false);
    setSelectedGamemode("301");
  };

  return (
    <>
      {gameStarted ? (
        <Games
          selectedGamemode={selectedGamemode}
          players={players}
          cbBackBtnClicked={handleBackToPlayerMenu}
          setsToWin={setsToWin}
          legsForSet={legsForSet}
        />
      ) : (
        <LocalMultiplayerMenu
          cbGamemodeSelected={handleGamemodeSelected}
          cbBackBtnClicked={props.cbBackBtnClicked}
          players={players}
          setPlayers={setPlayers}
          legsForSet={legsForSet}
          setLegsForSet={setLegsForSet}
          setsToWin={setsToWin}
          setSetsToWin={setSetsToWin}
          selectedGamemode={selectedGamemode}
          handleSettingsNext={() => {
            setGameStarted(true);
          }}
        />
      )}
    </>
  );
}

export default LocalMultiplayer;
