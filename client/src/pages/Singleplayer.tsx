import "../styles/Menu.css";
import { useState } from "react";
import { Gamemode } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";
import Games from "../components/Games";
import { useNavigate } from "react-router-dom";

function Singleplayer() {
  const navigate = useNavigate();
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);

  return (
    <>
      {selectedGamemode ? (
        <Games
          selectedGamemode={selectedGamemode}
          players={["Player1"]}
          cbBackBtnClicked={() => {
            setSelectedGamemode(null);
          }}
        />
      ) : (
        <GamemodeMenu cbBackBtnClicked={() => navigate("/")} cbGamemodeSelected={setSelectedGamemode} />
      )}
    </>
  );
}

export default Singleplayer;
