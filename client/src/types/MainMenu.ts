import React from "react";

export interface MainMenuProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayUserID: React.Dispatch<React.SetStateAction<string>>;
}
