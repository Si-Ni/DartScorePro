import { useState } from "react";
import { Gamemode, InAndOutMode, LocalMultiplayerProps } from "../../global/types";
import Games from "../../components/game/Games";
import PlayersAndSettings from "../../components/gameSettings/PlayersAndSettings";

function LocalMultiplayer(props: LocalMultiplayerProps) {
  const [players, setPlayers] = useState(["Player1"]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");

  const handleBackToPlayerMenu = () => {
    setGameStarted(false);
    setSelectedGamemode("301");
  };

  const numberOfPlayersCondition = (): boolean => {
    return players.length > 1;
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
        <Games {...gameProps} cbBackBtnClicked={handleBackToPlayerMenu} />
      ) : (
        <PlayersAndSettings
          {...gameProps}
          maxPlayers={4}
          validNumberOfPlayers={numberOfPlayersCondition()}
          setSelectedGamemode={setSelectedGamemode}
          setPlayers={setPlayers}
          setLegsForSet={setLegsForSet}
          setSetsToWin={setSetsToWin}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbBackBtnClicked={props.cbBackBtnClicked}
          handleSettingsNextBtnClicked={() => {
            setGameStarted(true);
          }}
        />
      )}
    </>
  );
}

export default LocalMultiplayer;
