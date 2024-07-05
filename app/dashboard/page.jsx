import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export async function DashBoard() {
    const session = await getServerSession(options);
    console.log("tao");
    console.log(session);
    console.log("bi kep giua");
    return(
        <div className="flex space-x-4">
            <div className= "user-info border-2 rounded-lg bg-black">
                <h1 className="text-white">{session?.user?.name}</h1>
                <p className="text-white"> {session?.user?.email}</p>
            </div>
            <div className="watch-list bg-black border-2 rounded-lg">
                <h1 className="text-white">Watch List</h1>
            </div>
        </div>
    );
};


export default DashBoard;