import { GameInputButtonsProps } from "./GameInputButtons";

function GameInputButtons(props: GameInputButtonsProps) {
  return (
    <>
      {props.values.map((number) => (
        <button
          key={number}
          className="button is-primary m-1 is-size-5"
          onClick={() => props.cbHandleButtonClicked(number)}
          style={{ width: `${props.btnSize}px` }}
          disabled={props.disabled}
        >
          {number}
        </button>
      ))}
      {props.showMissButton && (
        <button
          key={"Miss"}
          className="button is-danger m-1 is-size-5"
          onClick={() => props.cbHandleButtonClicked(0)}
          style={{ width: `${props.btnSize}px` }}
          disabled={props.disabled}
        >
          Miss
        </button>
      )}
    </>
  );
}
export default GameInputButtons;
