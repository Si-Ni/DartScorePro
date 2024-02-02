import { Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
import MainMenu from "./menus/MainMenu";
import { useEffect, useRef, useState } from "react";
import Register from "./authentication/Register";
import RegisterVerify from "./authentication/RegisterVerify";
import Singleplayer from "./modes/Singleplayer";
import PrivacyPolicy from "./information/PrivacyPolicy";
import Multiplayer from "./modes/Multiplayer";
import axios from "../api/axios";
import io from "socket.io-client";
import OnlineMultiplayer from "./onlineMultiplayer/OnlineMultiplayer";
import CheckoutCalculator from "./information/CheckoutCalculator";
import Tournament from "./tournament/Tournament";
import Impressum from "./information/Impressum";
import Settings from "./settings/Settings";

const socket = io("http://localhost:4000");

const GENERAL_AUTH = "/generalAuth";
function App() {
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("This password or username is invalid");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [displayUserID, setDisplayUserID] = useState<string>("");
  const [lobbyCode, setLobbyCode] = useState<string>("");
  const [isLobbyLeader, setIsLobbyLeader] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(GENERAL_AUTH, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setLoggedIn(true);
        setDisplayUserID(res.data.userID);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {isLoggedIn && <div className="fixed-bottom-left">Logged in as {displayUserID}</div>}
      <Routes>
        <Route path="/" element={<MainMenu setDisplayUserID={setDisplayUserID} setLoggedIn={setLoggedIn} />} />
        <Route
          path="/login"
          element={
            <Login
              loginErrorMsg={loginErrorMsg}
              pwdRef={pwdRef}
              setLoginErrorMsg={setLoginErrorMsg}
              setLoggedIn={setLoggedIn}
              setDisplayUserID={setDisplayUserID}
            />
          }
        />
        <Route
          path="/register"
          element={<Register loginErrorMsg={loginErrorMsg} pwdRef={pwdRef} setLoginErrorMsg={setLoginErrorMsg} />}
        />
        <Route path="/register/verify" element={<RegisterVerify />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route
          path="/multiplayer/lobby/:lobbyCode"
          element={
            <OnlineMultiplayer
              socket={socket}
              displayUserID={displayUserID}
              lobbyCode={lobbyCode}
              isLobbyLeader={isLobbyLeader}
              cbBackBtnClicked={() => {}}
              setIsLobbyLeader={setIsLobbyLeader}
            />
          }
        />

        <Route
          path="/multiplayer"
          element={
            <Multiplayer
              socket={socket}
              setLobbyCode={setLobbyCode}
              setIsLobbyLeader={setIsLobbyLeader}
              displayUserID={displayUserID}
            />
          }
        />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/checkoutCalculator" element={<CheckoutCalculator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </>
  );
}

export default App;
