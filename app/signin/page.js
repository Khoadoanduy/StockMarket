"use client"; // This marks the file as a client component

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use next/navigation

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
      router.push("/");
    }
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        {error && <p className="text-red-500 text-center">Cannot log in</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="black w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="black w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => router.push("/CreateUser")}
          className="w-full px-4 py-2 mt-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
