import Login from "./Login";
import { ReactNode, useRef, useState } from "react";
import Register from "./Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
