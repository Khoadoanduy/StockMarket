import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const WatchlistItemSchema = new Schema({
  symbol: String,
  timestamp: [Date],
  price: [Number],
});
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    watchlist: [WatchlistItemSchema],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
