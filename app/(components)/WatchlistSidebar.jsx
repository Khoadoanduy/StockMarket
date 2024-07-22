import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

function TickerRow({ ticker, removeFromWatchlist }) {
  const handleClick = () => removeFromWatchlist(ticker.symbol);

  return (
    <div className="border w-28">
      <span className="ml-2">{ticker}</span>
      <span className="ml-10 mr-2 cursor-pointer" onClick={handleClick}>
        X
      </span>
    </div>
  );
}

export default function WatchlistSidebar({ watchlist, setWatchList }) {
  const [textbox, setTextbox] = useState("");
  const { data: session } = useSession();

  const updateWatchList = async (newTicker) => {
    if (!session || !session.user || !session.user.email) {
      console.error("Session is not available or invalid.");
      return;
    }

    try {
      const response = await axios.post(`/api/watchlist/update-watchlist`, {
        email: session.user.email,
        newTicker: newTicker,
      });

      // setWatchList(response.data.watchlist);
    } catch (error) {
      console.log("Error updating watchlist:", error.response?.data || error.message);
    }
  };

  const removeFromWatchlist = (symbol) => {
    const newWatchlist = watchlist.filter((t) => t.symbol !== symbol);
    updateWatchList(newWatchlist);
  };

  const addToWatchlist = () => {
    if (!textbox) return;

    const newTicker = {
      symbol: textbox.toUpperCase(),
      timestamp: [new Date()],
      price: [0], // Initial price can be set to 0 or any other default value
    };

    // const newWatchlist = [...watchlist, newTicker];
    // console.log(newWatchlist);
    updateWatchList(newTicker);
    setTextbox("");
  };
   // This will print the array of all symbols
  //  const symbols = watchlist.map((ticker) => ticker.symbol);
  //  console.log(symbols); // This will print the array of all symbols
   
  return (
    <div className="my-4">
      {watchlist.map((ticker) => (
        
        <TickerRow
          ticker={ticker.symbol}
          key={ticker.symbol}
          removeFromWatchlist={removeFromWatchlist}
        />
      ))}
      

      <input
        className="text-black"
        type="text"
        value={textbox}
        onChange={(e) => setTextbox(e.target.value)}
      />
      <button type="button" className="ml-4 border" onClick={addToWatchlist}>
        Add to Watchlist
      </button>
    </div>
  );
}
