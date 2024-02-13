import React from "react";

export interface SettingsProps {
  displayUserID: string;
  setDisplayUserID: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
