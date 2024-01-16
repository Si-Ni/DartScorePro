import React, { useEffect, useRef, useState } from "react";
import vhCheck from "vh-check";
import "../styles/Login.css";
import { BarLoader } from "react-spinners";
// import { calenderSetDarkTheme, calenderSetLightTheme } from "../helpers";
import { RegisterProps } from "../global/types";
import { Link } from "react-router-dom";
import axios from "axios";
vhCheck("vh-check");

function Register(props: RegisterProps) {
  const invalidPwdMsgRef = useRef<HTMLInputElement>(null);
  const [isPwdDisabled, setPwdDisabled] = useState(false);
  const userIDRef = useRef<HTMLInputElement>(null);
  const userMailRef = useRef<HTMLInputElement>(null);
  const [isModeLoaded, setIsModeLoaded] = useState(true);
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(Boolean(localStorage.getItem("privacyPolicyAccepted")));

  const onSubmitPwd = () => {
    if (!policyAccepted) {
      props.setLoginErrorMsg("You must agree to the privacy policy!");
      invalidPwdMsgRef.current!.style.display = "block";
      return;
    }
    if (!props.pwdRef.current!.value || !userIDRef.current!.value) return;
    const pwd = props.pwdRef.current!.value;
    const userID = userIDRef.current!.value;
    const userMail = userMailRef.current!.value;

    console.log(userID, userMail, pwd);
    setPwdDisabled(true);
    axios
      .post("http://localhost:4000/register/", { userMail, userID, pwd })
      .then(() => {
        setPwdDisabled(false);
      })
      .catch((error) => {
        setPwdDisabled(false);
        console.log("dsd", error);
        if (error.response.status === 429) props.setLoginErrorMsg(error.response.statusText);
        else {
          console.log(error.response.status);
          props.setLoginErrorMsg("This password or username is invalid");
        }
        invalidPwdMsgRef.current!.style.display = "block";
        setTimeout(() => {
          document.getElementById("pwdInput")?.focus();
        }, 0);
      });
  };

  const onEnterPressed = (e: any) => {};

  const onChangeHideInvalidPwdMsg = () => {
    if ((invalidPwdMsgRef.current!.style.display = "block")) invalidPwdMsgRef.current!.style.display = "none";
  };

  useEffect(() => {}, []);

  return (
    <>
      {isModeLoaded ? (
        <div className="hero is-fullheight ">
          {isPwdDisabled ? <BarLoader id="top-barloader" color={"#00d1b2"} width={"100%"} /> : null}
          <div className="hero-body  is-justify-content-center is-align-items-center">
            <div className="columns is-half is-flex-direction-column box">
              <div className="column is-flex is-justify-content-center">
                <h1 className="is-size-5">Register</h1>
              </div>
              <div className="column">
                <input
                  ref={userMailRef}
                  disabled={isPwdDisabled}
                  autoFocus
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  placeholder="e-mail"
                  type="email"
                />
              </div>
              <div className="column">
                <input
                  ref={userIDRef}
                  disabled={isPwdDisabled}
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  placeholder="username"
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
              <div className="column policy">
                <input
                  type="checkbox"
                  defaultChecked={policyAccepted}
                  onChange={() => {
                    setPolicyAccepted(!policyAccepted);
                  }}
                />
                I agree to the{" "}
                <a className="policyLink" href="" target="_blank">
                  privacy policy
                </a>
              </div>
              <div className="column">
                <button
                  onClick={onSubmitPwd}
                  disabled={isPwdDisabled}
                  className="button is-primary is-fullwidth"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="has-text-centered">
                <p className="is-size-7">
                  <span
                    tabIndex={0}
                    onClick={props.changeLoginMode}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        props.changeLoginMode();
                      }
                    }}
                  >
                    <Link to={"/login"}>Login</Link>
                  </span>{" "}
                  -&nbsp;
                  <a href="" className="has-text-danger">
                    Help?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Register;
