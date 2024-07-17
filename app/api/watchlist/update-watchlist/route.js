import User from "/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const request = await req.json();
    const { email, watchlist } = request;

    // Confirm data exists
    if (!email || !Array.isArray(watchlist)) {
      return NextResponse.json(
        { message: "Email or watchlist is missing or invalid" },
        { status: 400 }
      );
    }

    // Validate watchlist items
    for (let item of watchlist) {
      if (
        typeof item.symbol !== 'string' ||
        !Array.isArray(item.timestamp) ||
        !Array.isArray(item.price) ||
        item.timestamp.length !== item.price.length ||
        !item.timestamp.every(date => !isNaN(new Date(date).getTime())) ||
        !item.price.every(price => typeof price === 'number')
      ) {
        return NextResponse.json(
          { message: "Invalid watchlist format" },
          { status: 400 }
        );
      }
    }

    // Check for user profile
    const userProfile = await User.findOne({ email }).exec();

    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user's watchlist
    userProfile.watchlist = watchlist;
    await userProfile.save();

    return NextResponse.json(
      { message: "Watchlist updated successfully", watchlist: userProfile.watchlist },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
