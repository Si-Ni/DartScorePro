import { useEffect, useRef, useState } from "react";
import { Options, SettingsProps, FormData } from "./Settings";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../../styles/Settings.css";
import NavigationButtons from "../../components/buttons/NavigationButtons/NavigationButtons.tsx";

const LOGOUT_URL = "/logout";
const USER_SETTINGS_URLS = {
  changeEmail: "/changeEmail",
  changeUsername: "/changeUsername",
  changePassword: "/changePassword",
  deleteStats: "/deleteStats",
  deleteAccount: "/deleteAccount"
};

function Settings(props: SettingsProps) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const errorMessage1Ref = useRef<HTMLParagraphElement | null>(null);
  const errorMessage2Ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      errorMessage1Ref.current!.style.display = isSmallScreen ? "block" : "none";
      errorMessage2Ref.current!.style.display = isSmallScreen ? "none" : "block";
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showOptions, setShowOptions] = useState<Options>({
    changeEmail: false,
    changeUsername: false,
    changePassword: false,
    deleteStats: false,
    deleteAccount: false
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

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
    setErrorMessage("");

    setShowOptions((prevOptions: Options) => ({
      ...(Object.fromEntries(Object.keys(prevOptions).map((key) => [key, false])) as Options),
      [option]: true
    }));
  };

  const handleSubmit = (option: keyof Options) => {
    const password = document.getElementById(`${option}-password`) as HTMLInputElement;
    const newInput = document.getElementById(`${option}-new`) as HTMLInputElement;
    const repeatInput = document.getElementById(`${option}-repeat`) as HTMLInputElement;

    const formData: FormData = {
      userPWD: password.value
    };

    if (option === "changeUsername") {
      formData.newUserID = newInput.value;
      formData.repeatedNewUserID = repeatInput?.value;
    } else if (option === "changeEmail") {
      formData.newUserMail = newInput.value;
      formData.repeatedNewUserMail = repeatInput?.value;
    } else if (option === "changePassword") {
      formData.newUserPWD = newInput.value;
      formData.repeatedNewUserPWD = repeatInput?.value;
    } else if (option === "deleteStats" || option === "deleteAccount") {
      formData.repeatedUserPWD = repeatInput?.value;
    }

    axios
      .post(USER_SETTINGS_URLS[option], formData, { withCredentials: true })
      .then(() => {
        logout();
      })
      .catch((error) => {
        window.innerWidth > 768
          ? (errorMessage2Ref.current!.style.display = "block")
          : (errorMessage1Ref.current!.style.display = "block");

        setErrorMessage(error.response.data);
      });
  };

  const onChangeHideErrorMessage = () => {
    errorMessage1Ref.current && (errorMessage1Ref.current!.style.display = "none");
    errorMessage2Ref.current && (errorMessage2Ref.current!.style.display = "none");
  };

  const renderInput = (label: string, option: keyof Options, type: string = "text") => (
    <>
      <div>
        <p
          className={`is-clickable has-text-weight-semibold has-text-centered is-underlined mb-4`}
          onClick={() => handleClick(option)}
        >
          {label}
        </p>
        {showOptions[option] && (
          <div className="field is-horizontal ">
            <div className="field-body ">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    id={`${option}-password`}
                    onChange={onChangeHideErrorMessage}
                    className="input"
                    type={"password"}
                    placeholder={"password"}
                  />
                </p>
              </div>
              {option !== "deleteStats" && option !== "deleteAccount" && (
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      id={`${option}-new`}
                      onChange={onChangeHideErrorMessage}
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
                    onChange={onChangeHideErrorMessage}
                    className="input"
                    type={type}
                    placeholder={
                      option === "deleteStats" || option === "deleteAccount"
                        ? `repeat ${type === "text" ? "username" : type}`
                        : `repeat new ${type === "text" ? "username" : type}`
                    }
                  />
                </p>
                {showOptions[option] && (
                  <p
                    className="help is-danger "
                    ref={errorMessage1Ref}
                    style={{ marginBottom: ".75rem", display: "none" }}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
              <div className="field field-submit">
                <p className="control ">
                  <button
                    className="button is-primary"
                    id="button-submit"
                    type="submit"
                    onClick={() => handleSubmit(option)}
                  >
                    Submit
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
        {showOptions[option] && (
          <p
            className="help is-danger"
            ref={errorMessage2Ref}
            style={{ marginLeft: ".75rem", marginTop: "-0.4375rem", display: "none" }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="card">
            <div className="card-content">
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
              <NavigationButtons contentBackBtn="Back" cbBackBtnClicked={() => navigate("/")} marginTop={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
