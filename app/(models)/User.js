import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const watchlistSchema = new Schema(
  {
    symbol: { type: String, required: true },
    timestamp: { type: [Date], required: true },
    price: { type: [Number], required: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    watchlist: [watchlistSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
