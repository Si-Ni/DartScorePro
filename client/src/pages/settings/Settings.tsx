import React, { useState } from "react";
import { SettingsProps } from "./Settings";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../../styles/Settings.css";

const LOGOUT_URL = "/logout";
const CHANGE_EMAIL_URL = "/changeEmail";
const CHANGE_USERNAME_URL = "/changeUsername";
const CHANGE_PASSWORD_URL = "/changePassword";
const DELETE_STATS_URL = "/deleteStats";
const DELETE_ACCOUNT_URL = "/deleteAccount";

type Options = {
  changeUsername: boolean;
  deleteAccount: boolean;
  changeEmail: boolean;
  deleteStats: boolean;
  changePassword: boolean;
};

function Settings(props: SettingsProps) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState<Options>({
    changeEmail: false,
    changeUsername: false,
    changePassword: false,
    deleteStats: false,
    deleteAccount: false
  });

  const logout = () => {
    axios
      .post(LOGOUT_URL, {}, { withCredentials: true })
      .then(() => {
        props.setLoggedIn(false);
        props.setDisplayUserID("");
        setAuth({});
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleClick = (option: keyof Options) => {
    setShowOptions((prevOptions: Options) => ({
      ...(Object.fromEntries(Object.keys(prevOptions).map((key) => [key, false])) as Options),
      [option]: true
    }));
  };

  const handleSubmit = (option: keyof Options) => {
    const password = document.getElementById(`${option}-password`) as HTMLInputElement;
    const newInput = document.getElementById(`${option}-new`) as HTMLInputElement;
    const repeatInput = document.getElementById(`${option}-repeat`) as HTMLInputElement;

    const formData: any = {
      password: password.value
    };

    if (option === "changeUsername") {
      formData.newUsername = newInput.value;
      formData.repeatedNewUsername = repeatInput?.value;
    } else if (option === "changeEmail") {
      formData.newEmail = newInput.value;
      formData.repeatedNewEmail = repeatInput?.value;
    } else if (option === "changePassword") {
      formData.newPassword = newInput.value;
      formData.repeatedNewPassword = repeatInput?.value;
    } else if (option === "deleteStats" || option === "deleteAccount") {
      formData.repeatedPassword = repeatInput?.value;
    }

    axios
      .post(
        option === "changeEmail"
          ? CHANGE_EMAIL_URL
          : option === "changeUsername"
          ? CHANGE_USERNAME_URL
          : option === "changePassword"
          ? CHANGE_PASSWORD_URL
          : option === "deleteStats"
          ? DELETE_STATS_URL
          : DELETE_ACCOUNT_URL,
        formData,
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderInput = (label: string, option: keyof Options, type: string = "text") => (
    <>
      <p
        className={`is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4`}
        onClick={() => handleClick(option)}
      >
        {label}
      </p>
      {showOptions[option] && (
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input id={`${option}-password`} className="input" type={"password"} placeholder={"password"} />
              </p>
            </div>
            {option !== "deleteStats" && option !== "deleteAccount" && (
              <div className="field">
                <p className="control is-expanded">
                  <input
                    id={`${option}-new`}
                    className="input"
                    type={type}
                    placeholder={`new ${type === "text" ? "username" : type}`}
                  />
                </p>
              </div>
            )}

            <div className="field">
              <p className="control is-expanded">
                <input
                  id={`${option}-repeat`}
                  className="input"
                  type={type}
                  placeholder={
                    option === "deleteStats" || option === "deleteAccount"
                      ? `repeat ${type === "text" ? "username" : type}`
                      : `repeat new ${type === "text" ? "username" : type}`
                  }
                />
              </p>
            </div>

            <div className="field field-submit">
              <p className="control">
                <button className="button is-primary" type="submit" onClick={() => handleSubmit(option, {})}>
                  Submit
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="card">
            <div className="card-content" style={{ minWidth: "799.05px" }}>
              <p className="has-text-weight-semibold has-text-centered is-size-3 mb-5">{props.displayUserID}</p>
              <form onSubmit={(e) => e.preventDefault()}>
                {renderInput("Change your email address", "changeEmail", "email")}
                {renderInput("Change your username", "changeUsername")}
                {renderInput("Change your password", "changePassword", "password")}
                <p
                  className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                  onClick={logout}
                >
                  Logout
                </p>
                {renderInput("Delete your stats", "deleteStats", "password")}
                {renderInput("Delete your account", "deleteAccount", "password")}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
