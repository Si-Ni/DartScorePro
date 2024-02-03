import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const REGISTER_VERIFY_LOGIN = "/register/verify";
function RegisterVerify() {
  const RegisterCodeRef = useRef<HTMLInputElement | null>(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const userMailRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onSubmitRegisterCode = () => {
    if (!RegisterCodeRef.current!.value || !userMailRef.current!.value) return;
    const registerCode = RegisterCodeRef.current!.value;
    const userMail = userMailRef.current!.value;
    axios
      .post(REGISTER_VERIFY_LOGIN, { userMail, registerCode })
      .then(() => {
        setInputDisabled(false);
        navigate("/login");
      })
      .catch(() => {
        setInputDisabled(false);

        setTimeout(() => {
          document.getElementById("pwdInput")?.focus();
        }, 0);
      });
  };

  return (
    <>
      <div className="hero is-fullheight ">
        <div className="hero-body  is-justify-content-center is-align-items-center">
          <div className="columns is-half is-flex-direction-column box">
            <div className="column is-flex is-justify-content-center">
              <h1 className="is-size-5">Verify your Mail</h1>
            </div>{" "}
            <div className="column">
              <input
                ref={userMailRef}
                disabled={inputDisabled}
                autoFocus
                className="input is-primary"
                placeholder="e-mail"
                type="email"
              />
            </div>
            <div className="column">
              <input
                ref={RegisterCodeRef}
                disabled={inputDisabled}
                className="input is-primary"
                placeholder="register code"
              />
            </div>
            <div className="column">
              <button onClick={onSubmitRegisterCode} className="button is-primary is-fullwidth" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterVerify;
