import "../styles/Menu.css";
import { useState } from "react";
import StandardGames from "../components/StandardGames";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";
import RoundTheClockGame from "../components/RoundTheClockGame";

function Singleplayer() {
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  return (
    <>
      {selectedGamemode != null ? (
        <div>
          {selectedGamemode === "301" && (
            <StandardGames
              gamemodeTotalScore={301}
              players={["Player1", "Player2"]}
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
          {selectedGamemode === "rcl" && (
            <RoundTheClockGame
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
