import { useState } from "react";
import { PlayerMenuProps } from "../../global/types";

function PlayerMenu({ players, setPlayers, ...props }: PlayerMenuProps) {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [error, setError] = useState("");

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addPlayer();
  };

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
  return (
    <div style={{ minWidth: "250px" }}>
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
              {props.isEditable && (
                <div>
                  <button className="button is-danger is-small ml-2" onClick={() => deletePlayer(index)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <hr></hr>
          </li>
        ))}
      </ul>
      {props.isEditable && (
        <div>
          <div className="field is-grouped">
            <div className="control mr-2">
              <input
                className={`input ${error && "is-danger"}`}
                style={{ width: "auto" }}
                type="text"
                value={currentPlayer}
                onChange={handleInputChange}
                onKeyUp={onKeyPressed}
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
        </div>
      )}
    </div>
  );
}

export default PlayerMenu;
