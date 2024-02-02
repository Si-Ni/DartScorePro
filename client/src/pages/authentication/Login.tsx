import React, { useRef, useState } from "react";
import vhCheck from "vh-check";
import "../../styles/Login.css";
import { BarLoader } from "react-spinners";
import { LoginProps } from "../../global/types";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
vhCheck("vh-check");

const LOGIN_URL = "/login";

function Login(props: LoginProps) {
  const { setAuth } = useAuth();
  const navigateTo = "/";

  const invalidPwdMsgRef = useRef<HTMLInputElement | null>(null);
  const [isPwdDisabled, setPwdDisabled] = useState(false);
  const userIDorMailRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onSubmitPwd = () => {
    if (!props.pwdRef.current!.value || !userIDorMailRef.current!.value) return;
    const userPWD = props.pwdRef.current!.value;
    const userIDorMail = userIDorMailRef.current!.value;
    setPwdDisabled(true);
    axios
      .post(LOGIN_URL, { userIDorMail, userPWD })
      .then((res) => {
        const token = res.data.token;
        setPwdDisabled(false);
        props.setLoggedIn(true);
        props.setDisplayUserID(`${res.data.userID}`);
        localStorage.setItem("token", token);
        setAuth({ userIDorMail, userPWD, token });

        navigate(navigateTo, { replace: true });
      })
      .catch((error) => {
        setPwdDisabled(false);
        if (error.response.status === 429) props.setLoginErrorMsg(error.response.statusText);
        else {
          props.setLoginErrorMsg(`${error.response.data}`);
        }
        invalidPwdMsgRef.current!.style.display = "block";
        setTimeout(() => {
          document.getElementById("pwdInput")?.focus();
        }, 0);
      });
  };

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmitPwd();
  };

  const onChangeHideInvalidPwdMsg = () => {
    if (invalidPwdMsgRef.current!.style.display === "block") invalidPwdMsgRef.current!.style.display = "none";
  };

  return (
    <>
      {
        <div className="hero is-fullheight ">
          {isPwdDisabled && <BarLoader id="top-barloader" color={"#00d1b2"} width={"100%"} />}
          <div className="hero-body  is-justify-content-center is-align-items-center">
            <div className="columns is-half is-flex-direction-column box">
              <div className="column is-flex is-justify-content-center">
                <h1 className="is-size-5">Login</h1>
              </div>
              <div className="column">
                <input
                  ref={userIDorMailRef}
                  disabled={isPwdDisabled}
                  autoFocus
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  placeholder="username or mail"
                />
              </div>
              <div className="column">
                <input
                  id="pwdInput"
                  ref={props.pwdRef}
                  disabled={isPwdDisabled}
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  type="password"
                  placeholder="password"
                />
                <p ref={invalidPwdMsgRef} style={{ display: "none" }} className="help is-danger">
                  {props.loginErrorMsg}
                </p>
              </div>
              <div className="column">
                <button
                  onClick={onSubmitPwd}
                  disabled={isPwdDisabled}
                  className="button is-primary is-fullwidth"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="has-text-centered">
                <p className="is-size-7">
                  <span tabIndex={0}>
                    <Link to={"/register"}>Register</Link>
                  </span>{" "}
                  -&nbsp;
                  <a href="client/src/components" className="has-text-danger">
                    Help?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Login;
