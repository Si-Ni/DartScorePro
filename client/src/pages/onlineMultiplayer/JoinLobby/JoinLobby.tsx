import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../../components/buttons/NavigationButtons/NavigationButtons.tsx";
import { JoinLobbyProps } from "./JoinLobby";

function JoinLobby(props: JoinLobbyProps) {
  const navigate = useNavigate();
  const lobbyCodeRef = useRef<HTMLInputElement | null>(null);
  const invalidPwdMsgRef = useRef<HTMLInputElement | null>(null);

  const joinLobby = () => {
    if (!lobbyCodeRef.current!.value.trim()) return;
    props.socket.emit("lobby:join", { lobbyCode: props.lobbyCode });

    props.socket.once("lobbyJoined", () => {
      navigate(`/multiplayer/lobby/${props.lobbyCode}`);
    });

    props.socket.once("lobbyNotFound", () => {
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
                value={props.lobbyCode}
                ref={lobbyCodeRef}
                onChange={(e) => {
                  props.setLobbyCode(e.target.value);
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
