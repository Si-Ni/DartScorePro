import Login from "./Login";
import { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DartsCounter from "./DartsCounter";
import Register from "./Register";
import RegisterVerify from "./RegisterVerify";

function App() {
  const pwdRef = useRef<HTMLInputElement>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("This password or username is invalid");

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login loginErrorMsg={loginErrorMsg} pwdRef={pwdRef} setLoginErrorMsg={setLoginErrorMsg} />}
          />
          <Route
            path="/register"
            element={<Register loginErrorMsg={loginErrorMsg} pwdRef={pwdRef} setLoginErrorMsg={setLoginErrorMsg} />}
          />
          <Route path="/register/verify" element={<RegisterVerify />} />
          <Route path="/dartscounter" element={<DartsCounter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
