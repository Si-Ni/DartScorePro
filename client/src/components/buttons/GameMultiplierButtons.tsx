import { useEffect } from "react";
import { GameMultiplierButtonsProps } from "../../global/types";
import "../../styles/Games.css";

function GameMultiplierButtons(props: GameMultiplierButtonsProps) {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
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
    <>
      <button
        className={`button is-info m-1 is-size-5 uniformButton ${isCurrentlySelected(1) ? "selectedButton" : ""}`}
        onClick={() => props.cbHandleMultiplierClicked(1)}
      >
        Single
      </button>
      <button
        className={`button is-success m-1 is-size-5 uniformButton ${isCurrentlySelected(2) ? "selectedButton" : ""}`}
        onClick={() => props.cbHandleMultiplierClicked(2)}
      >
        Double
      </button>
      <button
        className={`button is-warning m-1 is-size-5 uniformButton ${isCurrentlySelected(3) ? "selectedButton" : ""}`}
        onClick={() => props.cbHandleMultiplierClicked(3)}
      >
        Triple
      </button>
    </>
  );
}

export default GameMultiplierButtons;
