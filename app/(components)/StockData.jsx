"use client";
import React, { useEffect, useState } from "react";

import "/app/styles/StockContainer.css";
import TickerCard from "./TickerCard";

const StockContainer = () => {
  const [symbols, setSymbols] = useState(["AAPL", "MSFT", "GOOGL"]); // Default symbols

  return (
    <div className="stock-container">
      {/* <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={symbols}
          onChange={handleInputChange}
          placeholder="Enter comma-separated stock symbols"
        />
        <button type="submit">Fetch Data</button>
      </form> */}
      {symbols.map((symbol) => (
        <TickerCard ticker={symbol} key={symbol} />
      ))}
    </div>
  );
};

export default StockContainer;
