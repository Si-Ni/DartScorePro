import React from "react";

export interface LoginProps {
  pwdRef: React.RefObject<HTMLInputElement>;
  loginErrorMsg: string;

  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export interface RegisterProps {
  pwdRef: React.RefObject<HTMLInputElement>;
  loginErrorMsg: string;

  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}
export interface PlayerStats {
  average: number;
  dartsThrown: number;
  totalScore: number;
  turns: number;
}

export interface StandardGamemodesProps {
  gamemodeTotalScore: number;
}
