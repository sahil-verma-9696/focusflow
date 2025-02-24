"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket, getSocket } from "@/utils/socket";
import { updateSharedState } from "@/libs/store/features/shared/slice";
import CardsComponent from "@/components/CardsComponents";
import TasksComponent from "@/components/TasksComponent";
import LabelsComponent from "@/components/LabelsComponent";

export default function Page({ params }) {
  const router = useRouter();
  const workspaceId = useParams().id;
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user?.name);
  const [users, setUsers] = useState([]);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    if (!username) return;
    
    const socket = connectSocket(workspaceId, username);

    // ✅ Handle user updates
    socket.on("updateUsers", (usersList) => {
      setUsers(usersList.map(([_, name]) => name));
    });

    // ✅ Handle dynamic shared state updates
    socket.on("sharedStateUpdate", ({ type, key, payload }) => {
      if (type === "replace" || type === "update") {
        dispatch(updateSharedState({ key, payload }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username, workspaceId, dispatch]);

  // ✅ Handle joining the workspace
  const handleJoin = () => {
    if (!tempName.trim()) return alert("Enter your name!");

    // Set user in Redux (Assuming you have a `setUser` action)
    dispatch({ type: "user/setUser", payload: { name: tempName } });
  };

  // ✅ Show name input if not joined
  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-bold">
          Enter your name to join workspace
        </h1>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="border p-2 rounded w-64"
          placeholder="Your Name"
        />
        <button
          onClick={handleJoin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Join Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Workspace: {workspaceId}</h1>

      {/* ✅ Users in Workspace */}
      <h2 className="text-xl mt-3">👥 Users in this workspace:</h2>
      <ul className="list-disc ml-5">
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>

      {/* ✅ Shared Data Components */}
      <div className="mt-5">
        <h2 className="text-xl">Shared Workspace Data:</h2>
        {/* <CardsComponent /> */}
        <TasksComponent/>
        <LabelsComponent/>
        {/* You can add more components for other shared data types here */}
      </div>
    </div>
  );
}
