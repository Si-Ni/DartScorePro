import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import NavigationButtons from "../../../components/buttons/NavigationButtons/NavigationButtons.tsx";
import { useNavigate } from "react-router-dom";

const COMMON_CHECKOUTS = "/api/commonCheckout?";
function CheckoutCalculator() {
  const [currentScore, setCurrentScore] = useState<string>("");
  const [mostCommonCheckout, setMostCommonCheckout] = useState<string[]>([]);
  const [showNotPossibleMsg, setShowNotPossibleMsg] = useState<boolean>(false);
  const navigate = useNavigate();

  const getMostCommonCheckout = useCallback(() => {
    setShowNotPossibleMsg(false);
    if (currentScore.trim() !== "") {
      axios
        .get(COMMON_CHECKOUTS + new URLSearchParams({ score: currentScore }))
        .then((res) => {
          const checkout = res.data as string[];
          if (checkout.length === 0) setShowNotPossibleMsg(true);
          setMostCommonCheckout(checkout);
        })
        .catch(() => {});
    }
  }, [currentScore]);

  useEffect(() => {
    getMostCommonCheckout();
  }, [getMostCommonCheckout]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowNotPossibleMsg(false);
    let inputValue = event.target.value.replace(/\D/g, "");
    inputValue = inputValue === "" ? "" : Math.min(Math.max(Number(inputValue), 1), 170).toString();
    setCurrentScore(inputValue);
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box" style={{ minHeight: "300px", minWidth: "368px" }}>
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
          <div className="column is-flex is-justify-content-center">
            <div>
              <h1 className={`is-size-3 mt-5 ${showNotPossibleMsg && "has-text-danger"}`}>
                {showNotPossibleMsg ? "No checkout possible" : mostCommonCheckout.join(", ")}
              </h1>
            </div>
          </div>
          <NavigationButtons cbBackBtnClicked={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutCalculator;
