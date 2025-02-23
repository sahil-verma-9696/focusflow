"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "@/utils/socket";
import { setUser } from "@/libs/store/features/user/slice";
import { setHackathons } from "@/libs/store/features/hackathons/slice";
import HackathonManager from "@/components/HackathonManager";

export default function HackathonPage({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user);
  const [participants, setParticipants] = useState([]);
  const [hackathons, setHackathonsState] = useState([]); // ✅ Local hackathon state

//   useEffect(() => {
//     if (!username) return;
//     const socket = connectSocket(hackathonId, username);

//     socket.on("updateParticipants", (participantsList) => {
//       console.log("Received Participants List:", participantsList);
//       setParticipants(participantsList.map((user) => user.name || user));
//     });

//     socket.on("hackathonUpdate", ({ type, payload }) => {
//       if (type === "sync" || type === "replace") {
//         dispatch(setHackathons(payload.hackathons || []));
//         setHackathonsState(payload.hackathons || []); // ✅ Update local state
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [username, hackathonId, dispatch]);

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
      <HackathonManager/>
    </div>
  );
}
