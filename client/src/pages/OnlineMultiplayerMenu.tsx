import { useEffect, useState } from "react";
import GamemodeMenu from "../components/GamemodeMenu";
import PlayerMenu from "../components/PlayerMenu";
import { OnlineMultiplayerMenuProps } from "../global/types";
import { useNavigate } from "react-router-dom";

function OnlineMultiplayerMenu(props: OnlineMultiplayerMenuProps) {
  const navigate = useNavigate();
  const [showGamemodeMenu, setShowGamemodeMenu] = useState<boolean>(false);

  const handleNext = () => {
    if (props.players.length > 1) setShowGamemodeMenu(true);
  };

  useEffect(() => {
    props.socket.emit("joinedSuccessfully", props.lobbyCode);

    const handlePlayerJoined = (playerJoined: string) => {
      props.setPlayers((prevPlayers) => [...prevPlayers, playerJoined]);
    };

    const handleSetPlayerList = (players: string[]) => {
      props.setPlayers(players);
    };

    props.socket.on("playerJoined", handlePlayerJoined);

    props.socket.on("updatePlayersList", handleSetPlayerList);

    return () => {
      props.socket.off("playerJoined", handlePlayerJoined);
      props.socket.off("updatePlayersList", handleSetPlayerList);
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
