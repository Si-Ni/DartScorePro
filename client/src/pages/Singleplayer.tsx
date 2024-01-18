import "../styles/Menu.css";
import { useState } from "react";
import StandardGames from "./StandardGames";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";

function Singleplayer() {
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  return (
    <>
      {selectedGamemode != null ? (
        <div>
          {selectedGamemode === "301" && (
            <StandardGames
              gamemodeTotalScore={301}
              players={["Player1"]}
              cbReturnToMenu={() => {
                setSelectedGamemode(null);
              }}
            />
          )}
          {selectedGamemode === "501" && (
            <StandardGames
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
