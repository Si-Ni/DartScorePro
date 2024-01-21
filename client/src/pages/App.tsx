import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import MainMenu from "./MainMenu";
import { useEffect, useRef, useState } from "react";
import Register from "./Register";
import RegisterVerify from "./RegisterVerify";
import Singleplayer from "./Singleplayer";
import PrivacyPolicy from "./PrivacyPolicy";
import axios from "axios";
import Lobby from "./Lobby";
import Game from "./Game";
import io from "socket.io-client";

function App() {
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("This password or username is invalid");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [displayUserID, setDisplayUserID] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/generalAuth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoggedIn(true);
        setDisplayUserID(res.data.userID);
      })
      .catch(() => {});
  }, []);

  const socket = io.connect("http://localhost:4000"); // Update with your server URL
  return (
    <>
      {isLoggedIn && <div className="fixed-bottom-left">Logged in as {displayUserID}</div>}
      <Router>
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer/lobby/:code" element={<Game socket={socket} displayUserID={displayUserID} />} />
          <Route path="/multiplayer/lobby" element={<Lobby socket={socket} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
