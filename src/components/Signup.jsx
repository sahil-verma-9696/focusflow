"use client"

import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  async function handleSignup() {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "admin",
      }),
    };

    try {
      const response = await fetch(
        "https://fbd5-14-139-236-162.ngrok-free.app/auth/signup",
        obj
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setUser(data.user);
        setShowPopup(false);
      } else {
        console.error("Error registering user:", response.status);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 text-white"
      >
        Signup
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Signup</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSignup}
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className="mt-4 bg-green-600 text-white p-3 rounded-lg shadow-lg">
          <p>{message}</p>
          {user && (
            <p className="text-sm">Welcome, {user.name} ({user.email})</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Signup;
