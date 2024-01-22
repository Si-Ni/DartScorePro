import { useEffect, useState } from "react";
import GamemodeMenu from "../components/GamemodeMenu";
import PlayerMenu from "../components/PlayerMenu";
import { OnlineMultiplayerMenuProps } from "../global/types";

function OnlineMultiplayerMenu(props: OnlineMultiplayerMenuProps) {
  const [showGamemodeMenu, setShowGamemodeMenu] = useState<boolean>(false);

  const handleNext = () => {
    if (props.players.length > 1) setShowGamemodeMenu(true);
  };

  useEffect(() => {
    props.socket.emit("joinedSuccessfully", props.lobbyCode);

    const handlePlayerJoined = (playerJoined: any) => {
      props.setPlayers((prevPlayers) => [...prevPlayers, playerJoined]);
    };

    const handleSetPlayerList = (players: any[]) => {
      props.setPlayers(players);
    };

    props.socket.on("playerJoined", handlePlayerJoined);

    props.socket.on("playerList", handleSetPlayerList);

    return () => {
      props.socket.off("playerJoined", handlePlayerJoined);
      props.socket.off("playerList", handleSetPlayerList);
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
                <button className="button is-danger m-1" onClick={props.cbBackBtnClicked}>
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
