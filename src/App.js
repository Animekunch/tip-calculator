import React, { useState, useEffect } from "react";

import "./App.css";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const App = () => {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("10%");
  const [split, setSplit] = useState(1);
  const [splitTotal, setSplitTotal] = useState(0);

  const handleBillChange = (e) => {
    setBill(e.target.value);
  };

  function handleTipChange(e) {
    let value = e.target.value.replace("%", "");
    if (value.indexOf("%") === -1) {
      value += "%";
    }
    setTip(value);
  }

  function splitMinus() {
    setSplit((splitValue) => {
      if (splitValue === 1) {
        return 1;
      } else {
        return splitValue - 1;
      }
    });
  }
  function splitPlus() {
    setSplit(split + 1);
  }

  function calculateTotal() {
    const tipPercentage = 1 + parseInt(tip.replace("%", "")) / 100;
    const result = ((bill * tipPercentage) / split).toFixed(2);
    setSplitTotal(result);
  }
   useEffect(() => {
      calculateTotal()
   }, [bill, tip, split])
  return (
    <div>
      <label>Total Bill</label>
      <input
        type="text"
        placeholder={"0.00"}
        value={bill}
        onChange={handleBillChange}
      />
      <label>Tip</label>
      <input
        type="text"
        placeholder={"0.00"}
        value={tip}
        onChange={handleTipChange}
      />
      <div className="summary">
        <div className="split">
          <label>Split</label>
          <div className="split-control">
            <button onClick={splitMinus}>-</button>
            <span>{split}</span>
            <button onClick={splitPlus}>+</button>
          </div>
        </div>
        <div className="result">
          <label>Split total</label>
          <span>{splitTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
