import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../../components/buttons/NavigationButtons/NavigationButtons.tsx";
import { CreateLobbyProps } from "./CreateLobby";

function CreateLobby(props: CreateLobbyProps) {
  const navigate = useNavigate();
  const lobbyCodeRef = useRef<HTMLInputElement | null>(null);
  const codeCopiedRef = useRef<HTMLInputElement | null>(null);

  const createLobby = () => {
    props.socket.emit("lobby:create");

    props.socket.once("lobbyCreated", (newLobbyCode: string) => {
      props.setLobbyCode(newLobbyCode);
    });

    hideCodeCopied();
  };

  const handleCopy = () => {
    if (props.lobbyCode) {
      navigator.clipboard
        .writeText(props.lobbyCode)
        .then(() => {
          codeCopiedRef.current!.style.display = "block";
        })
        .catch((err) => {
          console.error("Unable to copy lobby code to clipboard", err);
        });
    }
  };

  const hideCodeCopied = () => {
    if (codeCopiedRef.current && codeCopiedRef.current!.style.display === "block") {
      codeCopiedRef.current!.style.display = "none";
    }
  };

  const handleNext = () => {
    if (!lobbyCodeRef.current!.value.trim()) return;
    props.setIsLobbyLeader(true);
    navigate(`/multiplayer/lobby/${props.lobbyCode}`);
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
                value={props.lobbyCode}
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
            <NavigationButtons
              cbBackBtnClicked={props.cbBackBtnClicked}
              cbNextBtnClicked={handleNext}
            ></NavigationButtons>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateLobby;
