"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // ✅ Fix: useParams for dynamic routes
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "@/utils/socket";
import { setUser } from "@/lib/store/userSlice";

export default function WorkspacePage() {
  const router = useRouter();
  const params = useParams(); // ✅ Fix: Get params correctly
  const workspaceId = params?.id; // ✅ Unwrap safely
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const [users, setUsers] = useState([]);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    if (!username || !workspaceId) return; // Ensure username & workspaceId exist

    const socket = connectSocket(workspaceId, username);

    socket.on("updateUsers", (usersList) => {
      setUsers(usersList.map(([_, name]) => name));
    });

    return () => {
      socket.disconnect();
    };
  }, [username, workspaceId]);

  const handleJoin = () => {
    if (!tempName.trim()) return alert("Enter your name!");
    dispatch(setUser({ name: tempName })); // ✅ Save name in Redux store
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
    </div>
  );
}
