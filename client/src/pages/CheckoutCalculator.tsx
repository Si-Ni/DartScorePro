import axios from "axios";
import { useState } from "react";

function CheckoutCalculator() {
  const [currentScore, setCurrentScore] = useState<string>("");
  const [mostCommonCheckout, setMostCommonCheckout] = useState<string[]>([]);
  const [showNotPossibleMsg, setShowNotPossibleMsg] = useState<boolean>(false);

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") getMostCommonCheckout();
  };

  const getMostCommonCheckout = () => {
    setShowNotPossibleMsg(false);
    if (currentScore.trim() !== "") {
      axios
        .get(`http://localhost:4000/api/commonCheckout?` + new URLSearchParams({ score: currentScore }))
        .then((res) => {
          const checkout = res.data as string[];
          if (checkout.length === 0) setShowNotPossibleMsg(true);
          setMostCommonCheckout(checkout);
        })
        .catch(() => {});
    }
  };

  const handleInputChange = (event: any) => {
    setShowNotPossibleMsg(false);
    setCurrentScore(event.target.value);
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box" style={{ minHeight: "300px" }}>
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Checkout calculator</h1>
          </div>
          <div className="field is-grouped">
            <div className="control mr-2">
              <input
                className={"input"}
                style={{ width: "auto" }}
                type="text"
                value={currentScore}
                onChange={handleInputChange}
                onKeyUp={onKeyPressed}
                placeholder="Enter your score"
              />
            </div>
            <div className="control">
              <button className="button is-primary ml-2" onClick={getMostCommonCheckout}>
                Get most common checkout
              </button>
            </div>
          </div>
          <div className="column is-flex is-justify-content-center">
            <div>
              <h1 className={`is-size-3 mt-5 ${showNotPossibleMsg && "has-text-danger"}`}>
                {showNotPossibleMsg ? "No checkout possible" : mostCommonCheckout.join(", ")}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCalculator;
