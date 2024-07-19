// models/Watchlist.js
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  timestamp: { type: [Date], required: true },
  price: { type: [Number], required: true }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
