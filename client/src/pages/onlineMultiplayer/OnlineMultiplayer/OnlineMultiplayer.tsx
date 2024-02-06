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
    if (lobbyCode) props.setLobbyCode(lobbyCode);
  }, [lobbyCode]);

  useEffect(() => {
    const handleGameStarted = (data: DSettingsAndGameData) => {
      setGameSettings(data.gameSettings);
      setInitialGameStats(data.game);
    };

    const setGameSettings = (gameSettings: DGameSettings) => {
      setSelectedGamemode(gameSettings.selectedGamemode);
      setSetsToWin(gameSettings.setsToWin);
      setLegsForSet(gameSettings.legsForSet);
      setModeIn(gameSettings.modeIn);
      setModeOut(gameSettings.modeOut);
    };

    props.socket.on("leaderStartedGame", handleGameStarted);

    return () => {
      props.socket.off("leaderStartedGame", handleGameStarted);
    };
  }, [props.socket]);

  useEffect(() => {
    if (props.lobbyCode && props.displayUserID) {
      props.socket.emit("lobby:join", { lobbyCode: props.lobbyCode, userID: props.displayUserID });
    }
  }, [props.lobbyCode, props.socket, props.displayUserID]);

  useEffect(() => {
    const handleSetPlayerList = (players: { userID: string; isLeader: boolean }[]) => {
      const isLeader = players.find((player) => player.userID === props.displayUserID && player.isLeader);

      setPlayers(players.map((player) => player.userID));

      isLeader && props.setIsLobbyLeader(true);
    };

    props.socket.on("updatePlayersList", handleSetPlayerList);

    props.socket.on("isGameStarted", () => setGameStarted(true));

    return () => {
      props.socket.off("updatePlayersList", handleSetPlayerList);
    };
  }, [props.socket, setPlayers, props.displayUserID]);

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
        lobbyCode: props.lobbyCode,
        gameSettings: gameSettings
      });
    }
  };

  const handleLeaveLobby = () => {
    props.setLobbyCode("");
    props.socket.emit("lobby:leave");
    navigate("/multiplayer");
  };

  const gameProps = {
    socket: props.socket,
    lobbyCode: props.lobbyCode,
    displayUserID: props.displayUserID,
    players: players,
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut,
    cbBackBtnClicked: handleLeaveLobby
  };

  return (
    <>
      {gameStarted ? (
        <OnlineGames {...gameProps} initialGameStats={initialGameStats} />
      ) : (
        <OnlineMultiplayerSettings
          {...gameProps}
          setSelectedGamemode={setSelectedGamemode}
          setPlayers={setPlayers}
          isLobbyLeader={props.isLobbyLeader}
          setSetsToWin={setSetsToWin}
          setLegsForSet={setLegsForSet}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbNextBtnClicked={nextBtnClicked}
          setIsLobbyLeader={props.setIsLobbyLeader}
          setGameStarted={setGameStarted}
        />
      )}
    </>
  );
}

export default OnlineMultiplayer;
