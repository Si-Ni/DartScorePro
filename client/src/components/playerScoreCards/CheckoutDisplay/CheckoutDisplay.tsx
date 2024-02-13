import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import "../../../styles/Games.css";
import { Checkout, CheckoutDisplayProps } from "./CheckoutDisplay";

const COMMON_CHECKOUTS_URL = "/api/commonCheckout?";
const STATISTICS_URL = "/api/userStats";

function CheckoutDisplay(props: CheckoutDisplayProps) {
  const [possibleCheckout, setPossibleCheckout] = useState<string[] | null>(null);
  const [mostPlayedCheckout, setMostPlayedCheckout] = useState<Checkout | null>(null);

  const findMaxTimesPlayed = (data: Checkout[]): Checkout | null => {
    if (data.length === 0) {
      return null;
    }

    return data.reduce((prev, current) => {
      return current.timesPlayed > prev.timesPlayed ? current : prev;
    });
  };

  useEffect(() => {
    axios
      .get(COMMON_CHECKOUTS_URL + new URLSearchParams({ score: props.score.toString() }))
      .then((res) => {
        const checkout = res.data as string[];
        setPossibleCheckout(checkout);
      })
      .catch(() => {});
    axios
      .get(STATISTICS_URL, { withCredentials: true })
      .then((res) => {
        const maxCheckout = res.data.playerStats.standard.checkouts[props.modeOut][props.score];

        if (props.playerName === res.data.userIDorMail && maxCheckout && maxCheckout.length > 0) {
          const mostPlayed = findMaxTimesPlayed(maxCheckout);
          setMostPlayedCheckout(mostPlayed);
        } else {
          setMostPlayedCheckout(null);
        }
      })
      .catch(() => {});
  }, [props.score]);

  return (
    <div className="columns ml-5" style={{ flexDirection: "column" }}>
      {(possibleCheckout as string[])?.length > 0 && props.modeOut === "double" && (
        <div className="column p-0">
          <span style={{ border: `1px solid #209CEE`, minWidth: "100px" }} className="tag is-info is-light">
            {possibleCheckout?.map((checkout, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block"
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    minWidth: "23px"
                  }}
                >
                  {checkout}
                </div>
                {index < possibleCheckout?.length - 1 && (
                  <span style={{ borderLeft: "1px solid #209CEE", margin: "0 5px", height: "100%" }} />
                )}
              </span>
            ))}
          </span>
        </div>
      )}{" "}
      {mostPlayedCheckout && (
        <div className="column p-0">
          <span style={{ border: `1px solid #ffdd57`, minWidth: "100px" }} className="tag is-warning is-light">
            {mostPlayedCheckout.checkout.map((checkout, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  minWidth: `${index < mostPlayedCheckout.checkout.length - 1 ? "33.3px" : "22px"}`
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    minWidth: "23px"
                  }}
                >
                  {checkout}
                </div>
                {index < mostPlayedCheckout.checkout.length - 1 && (
                  <span style={{ borderLeft: "1px solid #ffdd57", margin: "0 5px", height: "100%" }} />
                )}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

export default CheckoutDisplay;
