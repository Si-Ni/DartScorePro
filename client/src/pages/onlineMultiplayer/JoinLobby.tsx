import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../components/buttons/NavigationButtons";
import { JoinLobbyProps } from "../../types/JoinLobby";

function JoinLobby({ socket, ...props }: JoinLobbyProps) {
  const navigate = useNavigate();
  const [lobbyCode, setLobbyCode] = useState("");
  const lobbyCodeRef = useRef<HTMLInputElement | null>(null);
  const invalidPwdMsgRef = useRef<HTMLInputElement | null>(null);

  const joinLobby = () => {
    if (!lobbyCodeRef.current!.value.trim()) return;
    socket.emit("joinLobby", { lobbyCode: lobbyCode, userID: props.displayUserID });

    socket.once("lobbyJoined", () => {
      navigate(`/multiplayer/lobby/${lobbyCode}`);
    });

    socket.once("lobbyNotFound", () => {
      invalidPwdMsgRef.current!.style.display = "block";
    });

    onChangeHideInvalidCodeMsg();
  };

  const onChangeHideInvalidCodeMsg = () => {
    if (invalidPwdMsgRef.current && invalidPwdMsgRef.current?.style.display === "block") {
      invalidPwdMsgRef.current!.style.display = "none";
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
            <NavigationButtons
              cbBackBtnClicked={props.cbBackBtnClicked}
              cbNextBtnClicked={joinLobby}
              contentNextBtn="Join"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinLobby;
