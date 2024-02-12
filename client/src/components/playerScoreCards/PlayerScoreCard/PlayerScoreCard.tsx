import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import "../../../styles/Games.css";
import { PlayerScoreCardProps } from "./PlayerScoreCard";

const COMMON_CHECKOUTS_URL = "/api/commonCheckout?";
const USER_STATS_URL = "/api/userStats";

function PlayerScoreCard(props: PlayerScoreCardProps) {
  const [commonCheckouts, setCommonCheckouts] = useState(null);
  const [userStats, setUserStats] = useState<string[]>(null);

  useEffect(() => {
    // Fetch common checkouts
    axios
      .get(COMMON_CHECKOUTS_URL + new URLSearchParams({ score: props.score.toString() }))
      .then((res) => {
        const checkout = res.data as string[];
        setCommonCheckouts(checkout);
      })
      .catch(() => {});

    // Fetch user stats
    axios
      .get(USER_STATS_URL)
      .then((res) => {
        setUserStats(res.data);
      })
      .catch(() => {});
  }, [props.score]);

  return (
    <div className="column is-full playerCard">
      <div className="box" style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}>
        <h1 className={`title is-5 ${props.isStartingPlayer && "red-dot"}`}>{props.playerName}</h1>
        <p className="subtitle is-1">
          {props.score}{" "}
          {possibleCheckout?.length > 0 && (
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
