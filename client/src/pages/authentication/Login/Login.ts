import React from "react";
import { Socket } from "socket.io-client";

export interface LoginProps {
  pwdRef: React.RefObject<HTMLInputElement>;
  loginErrorMsg: string;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayUserID: React.Dispatch<React.SetStateAction<string>>;

  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}
