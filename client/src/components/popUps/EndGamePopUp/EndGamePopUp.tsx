import { getGamemodeString } from "../../../helpers/getGamemodeString";
import { EndGamePopUpProps } from "./EndGamePopUp";
import { WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "react-share";

function EndGamePopUp(props: EndGamePopUpProps) {
  const shareUrl = "https://dartscore.pro/";

  const getContent = (): string => {
    if (props.gameType === "singleplayer") {
      return "You have won!";
    } else {
      return `Player: ${props.winnerName} has won this ${props.gameType === "tournament" ? "tournament" : "game"}!`;
    }
  };

  const getSetsString = (sets: number): string => {
    return ` by winning ${sets} ${sets === 1 ? "set" : "sets"}`;
  };

  const getContentForSharing = (): string => {
    const sets = props.totalGameStats?.sets;
    if (props.gameType === "singleplayer") {
      return `I won a ${getGamemodeString(props.gamemode)} singleplayer darts match${
        sets && getSetsString(sets)
      } in the darts app:\n`;
    } else if (props.gameType === "local" || props.gameType === "online") {
      return `The player: ${props.winnerName} has won a ${getGamemodeString(props.gamemode)} ${
        props.gameType
      } darts match${sets && getSetsString(sets)} in the darts app:\n`;
    } else if (props.gameType === "tournament") {
      return `The player: ${props.winnerName} has won a ${getGamemodeString(props.gamemode)} ${
        props.gameType
      } in the darts app:\n`;
    }
    return "";
  };

  return (
    <div className="is-justify-content-center is-align-items-center is-fullheight">
      <div className="modal" style={{ display: "flex", backdropFilter: "blur(2px)" }}>
        <div className="modal-card" style={{ borderRadius: "20px", border: "2px solid grey" }}>
          <section className="modal-card-body pl-0 pr-0">
            <div className="modal-content is-justify-content-center is-align-items-center" style={{ margin: "0" }}>
              <h1 className={"is-size-4"} style={{ textAlign: "center" }}>
                {getContent()}
              </h1>
            </div>
            <div className="modal-content is-flex is-justify-content-center is-align-items-center mt-3 ml-0 ">
              <div
                className="modal-content is-flex is-justify-content-center is-align-items-center"
                style={{ margin: "0", marginTop: "1em" }}
              >
                <WhatsappShareButton className="m-2" url={shareUrl} title={getContentForSharing()}>
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
                <TwitterShareButton className="m-2" url={shareUrl} title={getContentForSharing()}>
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
              </div>
            </div>
          </section>
          <section className="modal-card-foot is-justify-content-center is-align-items-center">
            <button className="button is-primary m-1 is-large" onClick={props.cbBtnClicked}>
              End game
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
export default EndGamePopUp;
