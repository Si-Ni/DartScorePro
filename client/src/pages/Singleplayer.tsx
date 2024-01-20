import "../styles/Menu.css";
import { useState } from "react";
import StandardGames from "../components/StandardGames";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";
import RoundTheClockGame from "../components/RoundTheClockGame";
import CricketGame from "../components/CricketGame";

function Singleplayer() {
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  return (
    <>
      {selectedGamemode ? (
        <div>
          {selectedGamemode === "301" && (
            <StandardGames
              gamemodeTotalScore={301}
              players={["Player 1", "Player 2"]}
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
          {selectedGamemode === "cri" && (
            <CricketGame
              players={["Player1", "Player2"]}
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
