import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockContainer.css";

export default function TickerCard({ ticker }) {
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState('1d');

  const fetchTickerData = async (ticker, dateRange) => {
    try {
      const endDate = new Date();
      endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const startDate = new Date();
      switch (dateRange) {
        case '1d':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case '5d':
          startDate.setDate(endDate.getDate() - 5);
          break;
        case '1m':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case '6m':
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        case '3y':
          startDate.setFullYear(endDate.getFullYear() - 3);
          break;
        case '5y':
          startDate.setFullYear(endDate.getFullYear() - 5);
          break;
        case '10y':
          startDate.setFullYear(endDate.getFullYear() - 10);
          break;
        default:
          startDate.setDate(endDate.getDate() - 1);
      }
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
      const formattedStartDate = startDate.toISOString().split('T')[0];
      console.log(formattedStartDate)

      const response = await axios.post(
        `http://localhost:3000/api/stockdata`,
        { symbol: ticker, startDate: formattedStartDate, endDate: formattedEndDate }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickerData(ticker, dateRange);
  }, [ticker, dateRange]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { quote, historical } = data;

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
        <div className="date-range-selector">
          <label htmlFor="date-range">Select Date Range:</label>
          <select
            id="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="1d">1 Day</option>
            <option value="5d">5 Days</option>
            <option value="1m">1 Month</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
            <option value="3y">3 Years</option>
            <option value="5y">5 Years</option>
            <option value="10y">10 Years</option>
          </select>
        </div>
      </div>
    </div>
  );
}
