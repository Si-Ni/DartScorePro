import { Route, Routes } from "react-router-dom";
import Login from "./authentication/Login/Login.tsx";
import MainMenu from "./menus/MainMenu/MainMenu.tsx";
import { useEffect, useRef, useState } from "react";
import Register from "./authentication/Register/Register.tsx";
import RegisterVerify from "./authentication/RegisterVerify/RegisterVerify";
import Singleplayer from "./modes/SinglePlayer/Singleplayer.tsx";
import PrivacyPolicy from "./information/PrivacyPolicy/PrivacyPolicy";
import Multiplayer from "./modes/Multiplayer/Multiplayer.tsx";
import axios from "../api/axios";
import io from "socket.io-client";
import OnlineMultiplayer from "./onlineMultiplayer/OnlineMultiplayer/OnlineMultiplayer.tsx";
import CheckoutCalculator from "./information/CheckoutCalculator/CheckoutCalculator";
import Tournament from "./tournament/Tournament";
import Impressum from "./information/Impressum/Impressum";
import Settings from "./settings/Settings";
import Statistics from "./statistics/Statistics.tsx";
import Footer from "../components/footer/Footer/Footer.tsx";

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
    axios
      .get(GENERAL_AUTH, {
        withCredentials: true
      })
      .then((res) => {
        setLoggedIn(true);
        setDisplayUserID(res.data.userID);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainMenu setDisplayUserID={setDisplayUserID} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
        />
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
        <Route path="/singleplayer" element={<Singleplayer displayUserID={displayUserID} />} />
        <Route
          path="/multiplayer/lobby/:lobbyCode"
          element={
            <OnlineMultiplayer
              socket={socket}
              displayUserID={displayUserID}
              lobbyCode={lobbyCode}
              setLobbyCode={setLobbyCode}
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
              lobbyCode={lobbyCode}
              setLobbyCode={setLobbyCode}
              setIsLobbyLeader={setIsLobbyLeader}
              displayUserID={displayUserID}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/checkoutCalculator" element={<CheckoutCalculator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} userID={displayUserID} />
    </>
  );
}

export default App;
