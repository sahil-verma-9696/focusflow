"use client";
import { useEffect, useState,use } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket, getSocket } from "@/utils/socket";
import { setUser } from "@/lib/store/userSlice";
import { setCards } from "@/lib/store/sharedSlice";
import CardsComponent from "@/components/CardsComponent";

export default function page({ params }) {
  const workspaceId = use(params).id;

  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const [users, setUsers] = useState([]);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    if (!username) return;
    const socket = connectSocket(workspaceId, username);

    socket.on("updateUsers", (usersList) => {
      setUsers(usersList.map(([_, name]) => name));
    });

    socket.on("sharedStateUpdate", ({ type, payload }) => {
      if (type === "sync" || type === "replace") {
        dispatch(setCards(payload.cards || []));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username, workspaceId, dispatch]);

  const handleJoin = () => {
    if (!tempName.trim()) return alert("Enter your name!");
    dispatch(setUser({ name: tempName }));
  };

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-bold">Enter your name to join workspace</h1>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="border p-2 rounded w-64"
          placeholder="Your Name"
        />
        <button onClick={handleJoin} className="bg-blue-600 text-white px-4 py-2 rounded">
          Join Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Workspace: {workspaceId}</h1>
      <h2 className="text-xl mt-3">👥 Users in this workspace:</h2>
      <ul className="list-disc ml-5">
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>

      <div className="mt-5">
        <h2 className="text-xl">Shared Cards:</h2>
        <CardsComponent />
      </div>
    </div>
  );
}
