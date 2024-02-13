import React from "react";
import { SettingsProps } from "./Settings";

function Settings(props: SettingsProps) {
  console.log(props.displayUserID);
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
                onClick={() => {}}
              >
                Logout
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
