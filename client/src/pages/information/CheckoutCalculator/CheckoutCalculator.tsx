import axios from "../../../api/axios";
import React, { useState, useEffect, useCallback } from "react";
import NavigationButtons from "../../../components/buttons/NavigationButtons/NavigationButtons.tsx";
import { useNavigate } from "react-router-dom";
import { stringifyThrow } from "../../../helpers/stringifyThrow";
import "../../../styles/CheckoutCalculator.css";

const COMMON_CHECKOUTS = "/api/commonCheckout?";
const ALL_CHECKOUTS_URL = "/api/allCheckouts?";

function CheckoutCalculator() {
  const [currentScore, setCurrentScore] = useState<string>("");
  const [possibleCheckouts, setPossibleCheckouts] = useState<string[]>([]);
  const [getAllCheckouts, setGetAllCheckouts] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setGetAllCheckouts(!getAllCheckouts);
  };

  const getCheckouts = useCallback(() => {
    const URL = getAllCheckouts ? ALL_CHECKOUTS_URL : COMMON_CHECKOUTS;
    if (currentScore.trim() === "") return;
    axios
      .get(URL + new URLSearchParams({ score: currentScore }))
      .then((res) => {
        const checkouts = getAllCheckouts
          ? res.data.map((e: any) => e.map((r: any) => stringifyThrow(r.number, r.multiplier)).join(", "))
          : [res.data.join(", ")];
        setPossibleCheckouts(checkouts);
      })
      .catch(() => {});
  }, [currentScore, getAllCheckouts]);

  useEffect(() => {
    getCheckouts();
  }, [getCheckouts]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    inputValue = inputValue === "" ? "" : Math.min(Math.max(Number(inputValue), 1), 170).toString();
    setCurrentScore(inputValue);
    if (inputValue === "" && currentScore.trim() !== "") {
      setPossibleCheckouts([]);
    }
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box" style={{ minHeight: "18.75rem" }}>
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Checkout calculator</h1>
          </div>

          <div className="column">
            <input
              className={"input"}
              type="number"
              value={currentScore}
              onChange={handleInputChange}
              placeholder="Enter your score"
            />
          </div>
          <div className="column is-flex is-justify-content-center" style={{ marginBottom: ".625rem" }}>
            <label className="checkbox">
              <input className="mr-2" type="checkbox" checked={getAllCheckouts} onChange={handleCheckboxChange} />
              Show all checkouts
            </label>
          </div>
          {possibleCheckouts.length > 0 ? (
            <ul className="column is-justify-content-center checkoutList">
              {possibleCheckouts.map((checkout, index) => (
                <li key={index}>
                  <h1 className="is-size-4" style={{ textAlign: "center" }}>
                    {checkout}
                  </h1>
                  {index != possibleCheckouts.length - 1 && <hr className="m-0 mt-1 mb-1" />}
                </li>
              ))}
            </ul>
          ) : (
            <div className="has-text-danger">No checkout possible</div>
          )}
          {getAllCheckouts && (
            <div className="column is-flex is-justify-content-center mt-1 mb-1" style={{ textAlign: "center" }}>
              <div>
                {possibleCheckouts.length > 1
                  ? possibleCheckouts.length + " options"
                  : possibleCheckouts.length + " option"}
              </div>
            </div>
          )}
          <NavigationButtons cbBackBtnClicked={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutCalculator;
