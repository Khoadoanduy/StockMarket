import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockContainer.css";

export default function TickerCard({ ticker }) {
  const [data, setData] = useState(null);

  const fetchTickerData = async (ticker) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/stockdata`,
        {symbol: ticker}
      );
      setData(response.data);
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

  const { quote, historical, searchResults } = data;

  return (
    <div className="stock-info border">
      <div className="stock-item">
        <div className="stock-header">
          <h1>
            {quote.longName} ({quote.symbol})
          </h1>
          <p>{quote.regularMarketPrice} USD</p>
          <p className="change">
            <span>
              {quote.regularMarketChange}
              {quote.regularMarketChangePercent}%
            </span>
          </p>
          {historical !== 'Historical data not requested' && (
            <p>
              Closed:{" "}
              {new Date(
                historical[historical.length - 1].date
              ).toLocaleString()}
            </p>
          )}
        </div>
        <div className="stock-details">
          {historical !== 'Historical data not requested' && (
            <>
              <div className="detail-item">
                <p>Open</p>
                <p>{historical[historical.length - 1].open}</p>
              </div>
            </>
          )}
          <div className="detail-item">
            <p>High</p>
            <p>{quote.regularMarketDayHigh}</p>
          </div>
          <div className="detail-item">
            <p>Low</p>
            <p>{quote.regularMarketDayLow}</p>
          </div>
          <div className="detail-item">
            <p>Mkt cap</p>
            <p>{quote.marketCap}</p>
          </div>
          <div className="detail-item">
            <p>P/E ratio</p>
            <p>{quote.trailingPE}</p>
          </div>
          <div className="detail-item">
            <p>Div yield</p>
            <p>{quote.dividendYield}</p>
          </div>
          <div className="detail-item">
            <p>52-wk high</p>
            <p>{quote.fiftyTwoWeekHigh}</p>
          </div>
          <div className="detail-item">
            <p>52-wk low</p>
            <p>{quote.fiftyTwoWeekLow}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
