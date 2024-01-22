import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { JoinLobbyProps } from "../global/types";

function JoinLobby({ socket, ...props }: JoinLobbyProps) {
  const navigate = useNavigate();
  const [lobbyCode, setLobbyCode] = useState("");
  const lobbyCodeRef = useRef<HTMLInputElement | null>(null);
  const invalidPwdMsgRef = useRef<HTMLInputElement | null>(null);

  const joinLobby = () => {
    if (!lobbyCodeRef.current!.value.trim()) return;
    socket.emit("joinLobby", lobbyCode);

    socket.once("lobbyJoined", () => {
      navigate(`/multiplayer/lobby/${lobbyCode}`);
    });

    socket.once("lobbyNotFound", () => {
      invalidPwdMsgRef.current!.style.display = "block";
    });

    onChangeHideInvalidCodeMsg();
  };

  const onChangeHideInvalidCodeMsg = () => {
    if (invalidPwdMsgRef.current && invalidPwdMsgRef.current.style.display === "block") {
      invalidPwdMsgRef.current.style.display = "none";
    }
  };

  return (
    <>
      <div className="hero is-fullheight">
        <div className="hero-body is-justify-content-center is-align-items-center">
          <div className="columns is-half is-flex-direction-column box">
            <div className="column is-flex is-justify-content-center">
              <h1 className="is-size-5">Enter Lobby Code</h1>
            </div>
            <div className="column">
              <input
                value={lobbyCode}
                ref={lobbyCodeRef}
                onChange={(e) => {
                  props.setLobbyCodeGlobal(e.target.value);
                  setLobbyCode(e.target.value);
                  onChangeHideInvalidCodeMsg();
                }}
                autoFocus
                className="input is-primary"
                placeholder="code"
                type="text"
              />
              <p ref={invalidPwdMsgRef} style={{ display: "none" }} className="help is-danger">
                {"Lobby not found"}
              </p>
            </div>

            <div className="buttons is-centered mt-5">
              <button className="button is-danger" onClick={props.cbBackBtnClicked}>
                Back
              </button>
              <button className="button is-primary" type="submit" onClick={joinLobby}>
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinLobby;
