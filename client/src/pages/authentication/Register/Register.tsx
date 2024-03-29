import React, { useRef, useState } from "react";
import vhCheck from "vh-check";
import "../../../styles/Login.css";
import { BarLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { RegisterProps } from "./Register";
vhCheck("vh-check");

const REGISTER_URL = "/register";

function Register(props: RegisterProps) {
  const invalidPwdMsgRef = useRef<HTMLInputElement | null>(null);
  const [isPwdDisabled, setPwdDisabled] = useState(false);
  const userIDRef = useRef<HTMLInputElement | null>(null);
  const userMailRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const repeatPwdRef = useRef<HTMLInputElement | null>(null);
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(Boolean(localStorage.getItem("privacyPolicyAccepted")));
  const navigate = useNavigate();

  const onSubmitPwd = () => {
    if (!policyAccepted) {
      props.setLoginErrorMsg("You must agree to the privacy policy!");
      invalidPwdMsgRef.current!.style.display = "block";
      return;
    }
    const userPWD = pwdRef.current!.value;
    const repeatPWD = repeatPwdRef.current!.value;
    if (userPWD !== repeatPWD) {
      props.setLoginErrorMsg("Passwords do not match");
      invalidPwdMsgRef.current!.style.display = "block";
      return;
    }
    if (!userPWD || !userIDRef.current!.value || !userMailRef.current!.value) return;

    const userID = userIDRef.current!.value;
    const userMail = userMailRef.current!.value;

    setPwdDisabled(true);
    axios
      .post(REGISTER_URL, { userMail, userID, userPWD })
      .then(() => {
        setPwdDisabled(false);
        navigate("/register/verify");
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
      <div className="hero is-fullheight">
        {isPwdDisabled && <BarLoader id="top-barloader" color={"#00d1b2"} width={"100%"} />}
        <div className="hero-body is-justify-content-center is-align-items-center">
          <div className="columns is-half is-flex is-flex-direction-column box">
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
                ref={pwdRef}
                disabled={isPwdDisabled}
                onChange={onChangeHideInvalidPwdMsg}
                onKeyUp={onEnterPressed}
                className="input is-primary"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="column">
              <input
                ref={repeatPwdRef}
                disabled={isPwdDisabled}
                onChange={onChangeHideInvalidPwdMsg}
                onKeyUp={onEnterPressed}
                className="input is-primary"
                type="password"
                placeholder="repeat password"
              />
              <p ref={invalidPwdMsgRef} style={{ display: "none" }} className="help is-danger">
                {props.loginErrorMsg}
              </p>
            </div>
            <div className="column policy pt-0">
              <input
                className="checkbox mr-2"
                type="checkbox"
                defaultChecked={policyAccepted}
                onChange={() => {
                  setPolicyAccepted(!policyAccepted);
                }}
                style={{ verticalAlign: "bottom", height: "100%" }}
              />
              I agree to the{" "}
              <span className="policyLink">
                <Link to={"/privacy-policy"}>privacy policy</Link>
              </span>
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
                <span tabIndex={0}>
                  <Link to={"/login"}>Login</Link>
                </span>{" "}
                -&nbsp;
                <a href="https://github.com/Si-Ni/DartScorePro" target="_blank" className="has-text-danger">
                  Help?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
