
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export async function Nav() {
  const session = await getServerSession(options);
  
  // return {
  //   props: {
  //     session,
  //   },
  // };

  
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/WatchList">Watch List</Link>
          {/* <Link href="/CreateUser">Create User</Link> */}
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">
              Logout
            </Link>
          ) : (
            <Link href="/signin">
              Login
            </Link>
            
          )}
          <Link href="/dashboard">
            <p> {session?.user?.name} </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};



export default Nav;