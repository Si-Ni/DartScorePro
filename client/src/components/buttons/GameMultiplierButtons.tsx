import { GameMultiplierButtonsProps } from "../../global/types";

function GameMultiplierButtons(props: GameMultiplierButtonsProps) {
  return (
    <>
      <button className="button is-info m-1 is-size-5 uniformButton" onClick={() => props.cbHandleMultiplierClicked(1)}>
        Single
      </button>
      <button
        className="button is-success m-1 is-size-5 uniformButton"
        onClick={() => props.cbHandleMultiplierClicked(2)}
      >
        Double
      </button>
      <button
        className="button is-warning m-1 is-size-5 uniformButton"
        onClick={() => props.cbHandleMultiplierClicked(3)}
      >
        Triple
      </button>
    </>
  );
}

export default GameMultiplierButtons;
