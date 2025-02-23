"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/userSlice";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleJoin = () => {
    if (!name.trim()) return alert("Enter your name!");

    const workspaceId = `ws-${Math.random().toString(36).substr(2, 8)}`;
    dispatch(setUser({ name, workspaceId })); // ✅ Now storing workspaceId also
    router.push(`/workspace/${workspaceId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">
        Enter your name to start collaborating
      </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-64"
        placeholder="Your Name"
      />
      <button
        onClick={handleJoin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Collaboration
      </button>
    </div>
  );
}
