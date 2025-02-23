"use client";
import { useSelector } from "react-redux";
import HackathonManager from "@/components/HackathonManager";

export default function HackathonPage({ params }) {

  const username = useSelector((state) => state.user.user);

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-bold">Enter your name to join Hackathon</h1>
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="Your Name"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Join Hackathon
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">All Hackathons</h1>
      <HackathonManager />
    </div>
  );
}
