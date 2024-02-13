import { NavigationButtonsProps } from "./NavigationButtons";
import "../../../styles/Games.css";

function NavigationButtons(props: NavigationButtonsProps) {
  return (
    <div className={`buttons is-flex is-centered mt-${props.marginTop ?? 5} mb-2`}>
      {props.cbBackBtnClicked && (
        <button className="button is-danger m-1 is-medium uniformButton" onClick={props.cbBackBtnClicked}>
          {props.contentBackBtn ? props.contentBackBtn : "Back"}
        </button>
      )}
      {(props.showNextBtn ?? true) && props.cbNextBtnClicked && (
        <button
          className="button is-primary m-1 is-medium uniformButton"
          onClick={props.cbNextBtnClicked}
          disabled={props.nextBtnDisabled ?? false}
        >
          {props.contentNextBtn ? props.contentNextBtn : "Next"}
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
