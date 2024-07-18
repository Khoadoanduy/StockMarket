"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl text-white mb-4">Create New User</h1>
        <label className="text-gray-300">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required
          value={formData.name || ""}
          className="p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-gray-300">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          required
          value={formData.email || ""}
          className="p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-gray-300">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          required
          value={formData.password || ""}
          className="p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Create User"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer transition duration-300"
        />
      </form>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default UserForm;
