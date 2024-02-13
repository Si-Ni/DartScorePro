import { useEffect } from "react";
import { GameMultiplierButtonsProps } from "./GameMultiplierButtons";
import "../../../styles/Games.css";

function GameMultiplierButtons(props: GameMultiplierButtonsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const validMultiplier = ["1", "2", "3"].includes(event.key);
      if (validMultiplier) props.cbHandleMultiplierClicked(Number(event.key));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isCurrentlySelected = (multiplier: number): boolean => {
    return props.multiplier === multiplier;
  };

  return (
    <div className="is-flex is-centered">
      <button
        className={`button is-info m-1 is-size-5 uniformButton ${
          isCurrentlySelected(1) && !props.disabled ? "selectedButton" : ""
        }`}
        onClick={() => props.cbHandleMultiplierClicked(1)}
        disabled={props.disabled}
      >
        Single
      </button>
      <button
        className={`button is-success m-1 is-size-5 uniformButton ${
          isCurrentlySelected(2) && !props.disabled ? "selectedButton" : ""
        }`}
        onClick={() => props.cbHandleMultiplierClicked(2)}
        disabled={props.disabled}
      >
        Double
      </button>
      <button
        className={`button is-warning m-1 is-size-5 uniformButton ${
          isCurrentlySelected(3) && !props.disabled ? "selectedButton" : ""
        }`}
        onClick={() => props.cbHandleMultiplierClicked(3)}
        disabled={props.disabled}
      >
        Triple
      </button>
    </div>
  );
}

export default GameMultiplierButtons;
