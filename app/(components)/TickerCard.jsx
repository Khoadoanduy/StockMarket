import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockContainer.css";

export default function TickerCard({ ticker }) {
  const [data, setData] = useState(null);
  // get ticker data
  const fetchTickerData = async (tickers) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/stock-data?tickers=${tickers}`
      );
      setData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickerData(ticker);
  }, [ticker]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // render ticker card
  return (
    <div className="stock-info border">
      <div className="stock-item">
        <div className="stock-header">
          <h1>
            {data.stock_info.longName} ({data.stock_info.symbol})
          </h1>
          <p>{data.stock_info.currentPrice} USD</p>
          <p className="change">
            {" "}
            <span>
              {data.stock_info.priceChange}
              {data.stock_info.priceChangePercent}%
            </span>
          </p>
          <p>
            Closed:{" "}
            {new Date(
              data.historical_data[data.historical_data.length - 1].Date
            ).toLocaleString()}
          </p>
        </div>
        <div className="stock-details">
          <div className="detail-item">
            <p>Open</p>
            <p>{data.historical_data[data.historical_data.length - 1].Open}</p>
          </div>
          <div className="detail-item">
            <p>High</p>
            <p>{data.stock_info.dayHigh}</p>
          </div>
          <div className="detail-item">
            <p>Low</p>
            <p>{data.stock_info.dayLow}</p>
          </div>
          <div className="detail-item">
            <p>Mkt cap</p>
            <p>{data.stock_info.marketCap}</p>
          </div>
          <div className="detail-item">
            <p>P/E ratio</p>
            <p>{data.stock_info.trailingPE}</p>
          </div>
          <div className="detail-item">
            <p>Div yield</p>
            <p>{data.stock_info.dividendYield}</p>
          </div>
          <div className="detail-item">
            <p>52-wk high</p>
            <p>{data.stock_info.fiftyTwoWeekHigh}</p>
          </div>
          <div className="detail-item">
            <p>52-wk low</p>
            <p>{data.stock_info.fiftyTwoWeekLow}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
