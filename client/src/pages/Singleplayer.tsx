import "../styles/Menu.css";
import { useState } from "react";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";
import Games from "../components/Games";

function Singleplayer() {
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  return (
    <>
      {selectedGamemode ? (
        <Games
          selectedGamemode={selectedGamemode}
          players={["Player1"]}
          cbReturnToMenu={() => {
            setSelectedGamemode(null);
          }}
        />
      ) : (
        <GamemodeMenu cbGamemodeSelected={setSelectedGamemode} />
      )}
    </>
  );
}

export default Singleplayer;
