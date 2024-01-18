import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StandardGamemodes from "./StandardGamemodes";
import Login from "./Login";
import MainMenu from "./MainMenu";
import { useRef, useState } from "react";
import Register from "./Register";
import RegisterVerify from "./RegisterVerify";
import Singleplayer from "./Singleplayer";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  const pwdRef = useRef<HTMLInputElement>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("This password or username is invalid");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route
            path="/login"
            element={<Login loginErrorMsg={loginErrorMsg} pwdRef={pwdRef} setLoginErrorMsg={setLoginErrorMsg} />}
          />
          <Route
            path="/register"
            element={<Register loginErrorMsg={loginErrorMsg} pwdRef={pwdRef} setLoginErrorMsg={setLoginErrorMsg} />}
          />
          <Route path="/register/verify" element={<RegisterVerify />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
