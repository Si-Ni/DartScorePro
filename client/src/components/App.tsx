import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DartsCounter from "./DartsCounter";
import Login from "./Login";
import MainMenu from "./MainMenu";
import { ReactNode, useRef, useState } from "react";
import Register from "./Register";
import RegisterCode from "./RegisterVerify";

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
          <Route path="/register/verify" element={<RegisterCode />} />
          <Route path="/dartscounter" element={<DartsCounter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
