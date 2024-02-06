import { useEffect, useState } from "react";
import { Gamemode, InAndOutMode } from "../../../types/global";
import OnlineGames from "../../../components/game/OnlineGames/OnlineGames.tsx";
import OnlineMultiplayerSettings from "../OnlineMultiplayerSettings/OnlineMultiplayerSettings.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { OnlineMultiplayerProps } from "./OnlineMultiplayer";
import { DGameSettings, DSettingsAndGameData } from "./OnlineMultiplayerDTOs";

function OnlineMultiplayer(props: OnlineMultiplayerProps) {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([props.displayUserID]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");
  const [initialGameStats, setInitialGameStats] = useState<any>();

  const { lobbyCode } = useParams();

  useEffect(() => {
    const setGameSettings = (gameSettings: DGameSettings) => {
      setSelectedGamemode(gameSettings.selectedGamemode);
      setSetsToWin(gameSettings.setsToWin);
      setLegsForSet(gameSettings.legsForSet);
      setModeIn(gameSettings.modeIn);
      setModeOut(gameSettings.modeOut);
    };

    const handleGameStarted = (data: DSettingsAndGameData) => {
      setGameSettings(data.gameSettings);
      setInitialGameStats(data.game);
    };

    props.socket.on("leaderStartedGame", handleGameStarted);

    return () => {
      props.socket.off("leaderStartedGame", handleGameStarted);
    };
  }, [props.socket]);

  useEffect(() => {
    if (initialGameStats) setGameStarted(true);
  }, [initialGameStats]);

  const nextBtnClicked = () => {
    if (props.isLobbyLeader) {
      const gameSettings: DGameSettings = {
        selectedGamemode: selectedGamemode,
        setsToWin: setsToWin,
        legsForSet: legsForSet,
        modeIn: modeIn,
        modeOut: modeOut
      };

      props.socket.emit("lobby:gameStarted", {
        lobbyCode: props.lobbyCode || lobbyCode,
        gameSettings: gameSettings
      });
    }
  };

  const handleLeaveLobby = () => {
    props.socket.emit("leaveLobby");
    navigate("/multiplayer");
  };

  const gameProps = {
    players: players,
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut
  };

  return (
    <>
      {gameStarted ? (
        <OnlineGames
          {...gameProps}
          initialGameStats={initialGameStats}
          cbBackBtnClicked={handleLeaveLobby}
          userID={props.displayUserID}
          socket={props.socket}
          lobbyCode={props.lobbyCode || lobbyCode}
        />
      ) : (
        <OnlineMultiplayerSettings
          {...gameProps}
          setSelectedGamemode={setSelectedGamemode}
          setPlayers={setPlayers}
          socket={props.socket}
          lobbyCode={props.lobbyCode}
          isLobbyLeader={props.isLobbyLeader}
          setSetsToWin={setSetsToWin}
          setLegsForSet={setLegsForSet}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbNextBtnClicked={nextBtnClicked}
          displayUserID={props.displayUserID}
          setIsLobbyLeader={props.setIsLobbyLeader}
          setGameStarted={setGameStarted}
        />
      )}
    </>
  );
}

export default OnlineMultiplayer;
