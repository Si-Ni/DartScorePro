import React from "react";

export interface SettingsProps {
  displayUserID: string;
  setDisplayUserID: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export type Options = {
  changeUsername: boolean;
  deleteAccount: boolean;
  changeEmail: boolean;
  deleteStats: boolean;
  changePassword: boolean;
};

export type FormData = {
  userPWD: string;
  newUserID?: string;
  repeatedNewUserID?: string;
  newUserMail?: string;
  repeatedNewUserMail?: string;
  newUserPWD?: string;
  repeatedNewUserPWD?: string;
  repeatedUserPWD?: string;
};
