import { useState } from "react";
import { Gamemode, LocalMultiplayerMenuProps } from "../global/types";
import GamemodeMenu from "../components/GamemodeMenu";
import Games from "../components/Games";

function LocalMultiplayer(props: LocalMultiplayerMenuProps) {
  const [players, setPlayers] = useState(["Player1"]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [error, setError] = useState("");
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode | null>(null);
  const [showGamemodeMenu, setShowGamemodeMenu] = useState<boolean>(false);

  const addPlayer = () => {
    if (currentPlayer.trim() !== "" && players.length < 4) {
      const truncatedPlayer = currentPlayer.substring(0, 20);

      if (players.includes(truncatedPlayer)) {
        setError("Player already exists!");
        return;
      }
      setPlayers([...players, truncatedPlayer]);
      setCurrentPlayer("");
    }
  };

  const deletePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
    setError("");
  };

  const handleInputChange = (event: any) => {
    setCurrentPlayer(event.target.value);
    setError("");
  };

  const handleGamemodeSelected = (gamemode: Gamemode) => {
    setShowGamemodeMenu(false);
    setSelectedGamemode(gamemode);
  };

  const handleNext = () => {
    if (players.length > 0) setShowGamemodeMenu(true);
  };

  const handleBack = () => {
    props.cbBackToMenu();
  };

  return (
    <>
      {selectedGamemode && (
        <Games selectedGamemode={selectedGamemode} players={players} cbReturnToMenu={() => setSelectedGamemode(null)} />
      )}
      {showGamemodeMenu ? (
        <GamemodeMenu cbGamemodeSelected={handleGamemodeSelected} />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <div className="column is-flex is-justify-content-center">
                <h1 className="is-size-4 mb-3">Player List</h1>
              </div>
              <hr></hr>
              <ul className="mb-6 mt-4">
                {players.map((player, index) => (
                  <li key={index}>
                    <div className="mb-2 is-flex">
                      <div className="is-flex-grow-1" style={{ lineHeight: "30px" }}>
                        {player}
                      </div>
                      <div>
                        <button className="button is-danger is-small ml-2" onClick={() => deletePlayer(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <hr></hr>
                  </li>
                ))}
              </ul>
              <div className="field is-grouped">
                <div className="control mr-2">
                  <input
                    className={`input ${error && "is-danger"}`}
                    style={{ width: "auto" }}
                    type="text"
                    value={currentPlayer}
                    onChange={handleInputChange}
                    placeholder="Enter player name"
                    disabled={players.length === 4}
                  />
                </div>
                <div className="control">
                  <button className="button is-primary ml-2" onClick={addPlayer} disabled={players.length === 4}>
                    Add Player
                  </button>
                </div>
              </div>
              {error && (
                <p className="has-text-danger" style={{ textAlign: "center" }}>
                  {error}
                </p>
              )}
              <div className="buttons is-centered mt-5">
                <button className="button is-danger m-1" onClick={handleBack}>
                  Back
                </button>
                <button className="button is-primary m-1" onClick={handleNext} disabled={players.length === 0}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocalMultiplayer;
