import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CreateLobbyProps } from "../../global/types";

function CreateLobby({ socket, setIsLobbyLeader, cbBackBtnClicked, setLobbyCodeGlobal }: CreateLobbyProps) {
  const navigate = useNavigate();
  const [lobbyCode, setLobbyCode] = useState("");
  const lobbyCodeRef = useRef<HTMLInputElement | null>(null);
  const codeCopiedRef = useRef<HTMLInputElement | null>(null);

  const createLobby = () => {
    socket.emit("createLobby");

    socket.once("lobbyCreated", (newLobbyCode: string) => {
      setLobbyCode(newLobbyCode);
      setLobbyCodeGlobal(newLobbyCode);
    });

    hideCodeCopied();
  };

  const handleCopy = () => {
    if (lobbyCode) {
      navigator.clipboard
        .writeText(lobbyCode)
        .then(() => {
          codeCopiedRef.current!.style.display = "block";
        })
        .catch((err) => {
          console.error("Unable to copy lobby code to clipboard", err);
        });
    }
  };

  const hideCodeCopied = () => {
    if (codeCopiedRef.current && codeCopiedRef.current.style.display === "block") {
      codeCopiedRef.current.style.display = "none";
    }
  };

  const handleNext = () => {
    if (!lobbyCodeRef.current!.value.trim()) return;
    setIsLobbyLeader(true);
    navigate(`/multiplayer/lobby/${lobbyCode}`);
  };

  return (
    <>
      <div className="hero is-fullheight">
        <div className="hero-body is-justify-content-center is-align-items-center">
          <div className="columns is-half is-flex-direction-column box">
            <div className="column is-flex is-justify-content-center">
              <h1 className="is-size-5">Create Lobby</h1>
            </div>
            <div className="column">
              <input
                value={lobbyCode}
                ref={lobbyCodeRef}
                onClick={handleCopy}
                autoFocus
                className="input is-primary"
                type="text"
                readOnly
                style={{ cursor: "pointer" }}
              />
              <p ref={codeCopiedRef} style={{ display: "none" }} className="help is-info">
                {"Code copied"}
              </p>
            </div>
            <div className="column">
              <button onClick={createLobby} className="button is-primary is-fullwidth" type="submit">
                Create Lobby
              </button>
            </div>
            <div className="buttons is-centered mt-5">
              <button className="button is-danger m-1" onClick={cbBackBtnClicked}>
                Back
              </button>
              <button className="button is-primary m-1" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateLobby;
