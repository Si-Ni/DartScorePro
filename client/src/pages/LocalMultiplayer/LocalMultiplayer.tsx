import { useState } from "react";
import { Gamemode, LocalMultiplayerProps } from "../../global/types";
import Games from "../../components/game/Games";
import LocalMultiplayerMenu from "./LocalMultiplayerSettings";

function LocalMultiplayer(props: LocalMultiplayerProps) {
  const [players, setPlayers] = useState(["Player1"]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);

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
          selectedGamemode={selectedGamemode}
          setSelectedGamemode={setSelectedGamemode}
          players={players}
          setPlayers={setPlayers}
          legsForSet={legsForSet}
          setLegsForSet={setLegsForSet}
          setsToWin={setsToWin}
          setSetsToWin={setSetsToWin}
          cbBackBtnClicked={props.cbBackBtnClicked}
          handleSettingsNextBtnClicked={() => {
            setGameStarted(true);
          }}
        />
      )}
    </>
  );
}

export default LocalMultiplayer;
