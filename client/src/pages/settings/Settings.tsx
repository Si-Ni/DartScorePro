import React from "react";
import { SettingsProps } from "./Settings";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = "/logout";

function Settings(props: SettingsProps) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(
        LOGOUT_URL,
        {},
        {
          withCredentials: true
        }
      )
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
  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <p className=" has-text-weight-semibold has-text-centered is-size-3 mb-5">{props.displayUserID}</p>
              <p
                className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                onClick={() => {}}
              >
                Change your email address
              </p>
              <p
                className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                onClick={() => {}}
              >
                Change your username
              </p>
              <p
                className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                onClick={() => {}}
              >
                Change your password
              </p>
              <p
                className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                onClick={logout}
              >
                Logout
              </p>
              <p
                className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                onClick={() => {}}
              >
                Delete your stats
              </p>
              <p
                className="is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4"
                onClick={() => {}}
              >
                Delete your account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
