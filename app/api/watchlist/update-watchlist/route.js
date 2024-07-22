import User from "/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const request = await req.json();
    console.log(request)
    const { email, watchlist } = request;

    // Confirm data exists
    if (!email || !Array.isArray(watchlist)) {
      return NextResponse.json(
        { message: "email or watchlist is missing or invalid" },
        { status: 400 }
      );
    }

    // Check for user profile
    const userProfile = await User.findOne({ email: email }).exec();
    console("oke oke user start")
    console.log(userProfile)
    console.log("user end")

    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Update the user's watchlist
    console.log(userProfile.watchlist)
    userProfile.watchlist = watchlist;
    await userProfile.save();


    return NextResponse.json(
      { message: "Watchlist updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}