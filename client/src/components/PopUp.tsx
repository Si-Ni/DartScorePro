import { PopUpProps } from "../global/types";

function YesNoPopUp(props: PopUpProps) {
  return (
    <div className="is-justify-content-center is-align-items-center is-fullheight">
      <div className="modal" style={{ display: "flex", backdropFilter: "blur(2px)" }}>
        <div className="modal-card" style={{ borderRadius: "20px", border: "2px solid grey" }}>
          <section className="modal-card-body" style={{ paddingLeft: "0" }}>
            <div className="modal-content is-justify-content-center is-align-items-center" style={{ margin: "0" }}>
              <h1 className={"is-size-4"} style={{ textAlign: "center" }}>
                {props.content}
              </h1>
            </div>
          </section>
          <section className="modal-card-foot is-justify-content-center is-align-items-center">
            <button className="button is-danger m-1 is-large" style={{ width: "150px" }} onClick={props.cbBtnClicked}>
              {props.btnContent}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
export default YesNoPopUp;
