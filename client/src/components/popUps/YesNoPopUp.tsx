import { YesNoPopUpProps } from "../../types/YesNoPopUp";

function YesNoPopUp(props: YesNoPopUpProps) {
  return (
    <div className="is-justify-content-center is-align-items-center is-fullheight">
      <div className="modal" style={{ display: "flex", backdropFilter: "blur(2px)" }}>
        <div className="modal-card" style={{ borderRadius: "20px", border: "2px solid grey" }}>
          <section className="modal-card-body" style={{ paddingLeft: "0" }}>
            <div className="modal-content is-justify-content-center is-align-items-center" style={{ margin: "0" }}>
              <p className={"is-Size-5"} style={{ textAlign: "center" }}>
                {props.content}
              </p>
            </div>
          </section>
          <section className="modal-card-foot is-justify-content-center is-align-items-center">
            <button className="button is-success m-1 is-large" style={{ width: "150px" }} onClick={props.cbYesClicked}>
              Yes
            </button>
            <button className="button is-danger m-1 is-large" style={{ width: "150px" }} onClick={props.cbNoClicked}>
              No
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
export default YesNoPopUp;
