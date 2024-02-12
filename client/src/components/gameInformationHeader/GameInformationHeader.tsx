import { GameInformationHeaderProps } from "./GameInformationHeader";

function GameInformationHeader(props: GameInformationHeaderProps) {
  return (
    <div className="is-flex is-justify-content-center m-0 pt-2 pb-2 gameInfo" style={{ zIndex: 99 }}>
      <p className="is-size-6 mr-4" style={{ textAlign: "center" }}>
        <strong>Remaining throws:</strong> {props.throwsRemaining}
      </p>
      <p className="is-size-6 mr-4" style={{ textAlign: "center" }}>
        <strong>First to:</strong> {props.setsToWin} {props.setsToWin > 1 ? "Sets" : "Set"}
      </p>
      <p className="is-size-6 mr-4" style={{ textAlign: "center" }}>
        <strong>Legs per set:</strong> {props.legsForSet}
      </p>
      <p className="is-size-6 mr-4" style={{ textAlign: "center" }}>
        <strong>{props.modeIn} in</strong>
      </p>
      <p className="is-size-6 mr-0" style={{ textAlign: "center" }}>
        <strong>{props.modeOut} out</strong>
      </p>
    </div>
  );
}
export default GameInformationHeader;
