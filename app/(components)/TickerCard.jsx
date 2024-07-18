import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockContainer.css";
import dynamic from 'next/dynamic';

export default function TickerCard({ ticker }) {
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState('1d');
  const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  
  const fetchTickerData = async (ticker, dateRange) => {
    try {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - 1);
      endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      console.log("start:" + startDate)
      switch (dateRange) {
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
          startDate.setDate(endDate.getDate() - 7);
      }
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
      const formattedStartDate = startDate.toISOString().split('T')[0];
      console.log(formattedStartDate,formattedEndDate);
      const response = await axios.post(
        `http://localhost:3000/api/stockdata`,
        { symbol: ticker, startDate: formattedStartDate, endDate: formattedEndDate }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const CandlestickChart = ({ data }) => {
    const series = [
      {
        name: 'AAPL',
        data: data.historical.map((d) => ({
          x: new Date(d.date).getTime(),
          y: [d.open, d.high, d.low, d.close],
        })),
      },
    ];
    const options = {
      chart: {
        type: 'candlestick',
        height: 100,
        background: '#000', // Black background
        events: {
          mouseMove: function(event, chartContext, config) {
            // Custom hover effect
            const sticks = document.querySelectorAll('.apexcharts-candlestick-series');
            sticks.forEach(stick => {
              stick.addEventListener('mouseenter', function() {
                this.style.fill = '#FFFF00'; // Change color on hover
              });
              stick.addEventListener('mouseleave', function() {
                this.style.fill = ''; // Revert color on mouse leave
              });
            });
          }
        }
      },
      title: {
        text: 'Candlestick Chart',
        align: 'left',
        style: {
          color: '#FFF', // White title color
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#FFF' // White x-axis labels
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: '#FFF' // White y-axis labels
          }
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#00FF00', // Green for upward sticks
            downward: '#FF0000' // Red for downward sticks
          }
        }
      },
      grid: {
        borderColor: '#333', // Dark grid lines
      },
      tooltip: {
        theme: 'dark', // Dark theme for tooltip
      }
    };
      return(
        <ReactApexChart options={options} series={series} type="candlestick" height={350} width={"100%"}/>
      )
  }

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
          <label>Select Date Range:</label>
          <div className="button-group">
            <button className="ml-2" onClick={() => setDateRange('1d')}>1 Day</button>
            <button className="ml-2" onClick={() => setDateRange('5d')}>5 Days</button>
            <button className="ml-2" onClick={() => setDateRange('1m')}>1 Month</button>
            <button className="ml-2" onClick={() => setDateRange('6m')}>6 Months</button>
            <button className="ml-2" onClick={() => setDateRange('1y')}>1 Year</button>
            <button className="ml-2" onClick={() => setDateRange('3y')}>3 Years</button>
            <button className="ml-2" onClick={() => setDateRange('5y')}>5 Years</button>
            <button className="ml-2" onClick={() => setDateRange('10y')}>10 Years</button>
          </div>
        </div>
      </div>
      <div id="chart">
        <CandlestickChart data={data} />
      </div>
        
      
    </div>
  );
}