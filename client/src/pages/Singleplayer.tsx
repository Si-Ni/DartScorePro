import "../styles/Menu.css";
import { useState } from "react";
import StandardGamemodes from "./StandardGamemodes";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";

function Singleplayer() {
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
              cbReturnToMenu={() => {
                setSelectedGamemode(null);
              }}
            />
          )}
          {selectedGamemode === "501" && (
            <StandardGamemodes
              gamemodeTotalScore={501}
              players={["Player1"]}
              cbReturnToMenu={() => {
                setSelectedGamemode(null);
              }}
            />
          )}
        </div>
      ) : (
        <GamemodeMenu cbGamemodeSelected={setSelectedGamemode} />
      )}
    </>
  );
}

export default Singleplayer;
