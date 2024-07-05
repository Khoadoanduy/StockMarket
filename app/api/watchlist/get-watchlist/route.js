import User from "/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const request = await req.json();
    console.log(request);
    const email = request.email;

    //Confirm data exists
    if (!email) {
      return NextResponse.json(
        { message: "email is missing" },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const userProfile = await User.findOne({ email: email }).lean().exec();

    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    console.log(userProfile);
    const watchlist = userProfile.watchlist;
    return NextResponse.json({ watchlist }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
