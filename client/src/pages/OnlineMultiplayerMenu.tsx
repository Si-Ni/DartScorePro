import { useEffect, useState } from "react";
import GamemodeMenu from "../components/GamemodeMenu";
import PlayerMenu from "../components/PlayerMenu";
import { Gamemode, OnlineMultiplayerMenuProps } from "../global/types";
import { useNavigate, useParams } from "react-router-dom";

function OnlineMultiplayerMenu(props: OnlineMultiplayerMenuProps) {
  const navigate = useNavigate();
  const [showGamemodeMenu, setShowGamemodeMenu] = useState<boolean>(false);

  const { code } = useParams();

  useEffect(() => {
    code && props.socket.emit("joinLobby", code);
  }, [code]);

  const handleNext = () => {
    if (props.players.length > 1) setShowGamemodeMenu(true);
  };

  useEffect(() => {
    props.socket.emit("joinedSuccessfully", props.lobbyCode);

    const handleSetPlayerList = (players: string[]) => {
      props.setPlayers(players);
    };

    const handleGamemodeSelected = (gamemode: Gamemode) => {
      props.cbGamemodeSelected(gamemode);
    };

    props.socket.on("updatePlayersList", handleSetPlayerList);

    props.socket.on("leaderSelectedGamemode", handleGamemodeSelected);

    return () => {
      props.socket.off("updatePlayersList", handleSetPlayerList);
      props.socket.off("leaderSelectedGamemode", handleGamemodeSelected);
    };
  }, [props.socket, props.setPlayers]);

  return (
    <>
      {showGamemodeMenu ? (
        <GamemodeMenu
          cbGamemodeSelected={props.cbGamemodeSelected}
          cbBackBtnClicked={() => setShowGamemodeMenu(false)}
        />
      ) : (
        <div className="hero is-justify-content-center is-align-items-center is-fullheight">
          <div className="hero-body">
            <div className="container box">
              <PlayerMenu players={props.players} setPlayers={props.setPlayers} isEditable={false} />
              <div className="buttons is-centered mt-5">
                <button
                  className="button is-danger m-1"
                  onClick={() => {
                    props.socket.emit("leaveLobby");
                    navigate("/multiplayer");
                  }}
                >
                  Back
                </button>
                {props.isLobbyLeader && (
                  <button className="button is-primary m-1" onClick={handleNext} disabled={props.players.length <= 1}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OnlineMultiplayerMenu;
