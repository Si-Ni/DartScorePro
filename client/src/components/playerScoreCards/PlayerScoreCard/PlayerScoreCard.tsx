import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import "../../../styles/Games.css";
import { PlayerScoreCardProps } from "./PlayerScoreCard";

const COMMON_CHECKOUTS_URL = "/api/commonCheckout?";
const STATISTICS_URL = "/api/userStats";

interface Checkout {
  checkout: number;
  timesPlayed: number;
}

function PlayerScoreCard(props: PlayerScoreCardProps) {
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
    <div className="column is-full playerCard">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className={`title is-5 ${props.isStartingPlayer && "red-dot"}`}>{props.playerName}</h1>
        <p className="subtitle is-1">
          {props.score}{" "}
          {possibleCheckout?.length > 0 && props.modeOut === "double" && (
            <span style={{ border: `1px solid #209CEE`, marginTop: "-11px" }} className="tag is-info is-light">
              {possibleCheckout?.map((checkout, index) => (
                <span key={index} style={{ display: "inline-block" }}>
                  {checkout}
                  {index < possibleCheckout?.length - 1 && (
                    <span style={{ borderLeft: "1px solid #209CEE", margin: "0 5px", height: "100%" }} />
                  )}
                </span>
              ))}
            </span>
          )}{" "}
          {mostPlayedCheckout && (
            <span style={{ border: `1px solid #ffdd57`, marginTop: "-11px" }} className="tag is-warning is-light">
              {mostPlayedCheckout.checkout.map((checkout, index) => (
                <span key={index} style={{ display: "inline-block" }}>
                  {checkout}
                  {index < mostPlayedCheckout.checkout.length - 1 && (
                    <span style={{ borderLeft: "1px solid #ffdd57", margin: "0 5px", height: "100%" }} />
                  )}
                </span>
              ))}
            </span>
          )}
        </p>

        <div className="columns ml-0" style={{ minHeight: "24px", display: "block" }}>
          {props.lastThrows.map((lastThrow, index) => (
            <div key={index} className="column pt-0 pb-0 pl-0 pr-2" style={{ display: "inline-block" }}>
              <p className="is-size-6">{lastThrow}</p>
            </div>
          ))}
        </div>
        {props.average != null && (
          <div className="average-box">
            <p className="subtitle is-6">Ø {props.average.toFixed(2)}</p>
          </div>
        )}
        <table className="table is-bordered mt-3">
          <tbody>
            <tr>
              <th>Sets:</th>
              <td>{props.sets}</td>
              <th>Legs:</th>
              <td>{props.legs}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerScoreCard;
