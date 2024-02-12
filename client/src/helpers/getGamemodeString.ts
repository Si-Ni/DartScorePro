import { Gamemode } from "../types/global";

const getGamemodeString = (gamemode: Gamemode): string => {
  switch (gamemode) {
    case "rcl":
      return "Round the Clock";
    case "cri":
      return "Cricket";
    default:
      return gamemode;
  }
};

export { getGamemodeString };
