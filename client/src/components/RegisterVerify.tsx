import React, { useRef, useState } from "react";
import axios from "axios";

function RegisterVerify() {
  const userRegisterCodeRef = useRef<HTMLInputElement>(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const onSubmitRegisterCode = () => {
    if (!userRegisterCodeRef.current!.value) return;
    const userRegisterCode = userRegisterCodeRef.current!.value;

    axios
      .post("http://localhost:4000/register/verify", { userRegisterCode })
      .then(() => {
        setInputDisabled(false);
        navigate("/dartscounter");
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
            </div>
            <div className="column">
              <input
                ref={userRegisterCodeRef}
                disabled={inputDisabled}
                autoFocus
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
