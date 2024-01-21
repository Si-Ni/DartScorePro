import { useState } from "react";
import { Gamemode, LocalMultiplayerProps } from "../global/types";
import Games from "../components/Games";
import LocalMultiplayerMenu from "./LocalMultiplayerMenu";

function LocalMultiplayer(props: LocalMultiplayerProps) {
  const [players, setPlayers] = useState(["Player1"]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  const handleGamemodeSelected = (gamemode: Gamemode) => {
    setSelectedGamemode(gamemode);
  };

  const handleBackToPlayerMenu = () => {
    setSelectedGamemode(null);
  };

  return (
    <>
      {selectedGamemode ? (
        <Games selectedGamemode={selectedGamemode} players={players} cbBackBtnClicked={handleBackToPlayerMenu} />
      ) : (
        <LocalMultiplayerMenu
          cbGamemodeSelected={handleGamemodeSelected}
          cbBackBtnClicked={props.cbBackBtnClicked}
          players={players}
          setPlayers={setPlayers}
        />
      )}
    </>
  );
}

export default LocalMultiplayer;
