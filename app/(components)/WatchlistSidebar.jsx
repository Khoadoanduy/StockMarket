import axios from "axios";

import { useSession } from "next-auth/react";
import { useState } from "react";

function TickerRow({ ticker, removeFromWatchlist }) {
  const handleClick = () => removeFromWatchlist(ticker);

  return (
    <div className="border w-28">
      <span className="ml-2">{ticker}</span>
      <span className="ml-10 mr-2" onClick={handleClick}>
        X
      </span>
    </div>
  );
}

export default function WatchlistSidebar({ email, watchlist, setWatchList }) {
  const [textbox, setTextbox] = useState("");
  const { data: session } = useSession();
  const [stockdata, setStockData] = useState(null);
  const updateWatchList = async (watchlist) => {
    try {
      await axios.post(`http://localhost:3000/api/watchlist/update-watchlist`, {
        email: session.user.email,
        watchlist: watchlist,
      });

      setWatchList(watchlist);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatchlist = (ticker) => {
    const newWatchlist = watchlist.filter((t) => t !== ticker);
    updateWatchList(newWatchlist);
  };

  const addToWatchlist = async () => {
    const newTicker = textbox.trim().toUpperCase();
    if (!newTicker) return;
  
    try {
      // Fetch current price
      const response = await axios.post(`http://localhost:3000/api/stockdata`, { symbol: newTicker });
      const currentPrice = response.data.quote.regularMarketPrice; // Correctly accessing the current price
      
      const newWatchlist = [
        ...watchlist,
        {
          symbol: newTicker,
          timestamp: [new Date().toISOString().split('T')[0]],
          price: [currentPrice],
        },
      ];
      console.log(newWatchlist)
      updateWatchList(newWatchlist);
      setTextbox("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4">
      {watchlist.map((ticker) => (
        <TickerRow
          ticker={ticker}
          key={ticker}
          removeFromWatchlist={removeFromWatchlist}
        />
      ))}
      <input
      className="text-black"
        type="Text"
        value={textbox}
        onChange={(e) => setTextbox(e.target.value)}
      />
      <button type="button" className="ml-4 border" onClick={addToWatchlist}>
        Update watchlist
      </button>
    </div>
  );
}
