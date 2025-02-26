"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "@/utils/socket";
import { updateSharedState } from "@/libs/store/features/shared/slice";
import TasksComponent from "@/components/TasksComponent";

export default function WorkspacePage() {
  const router = useRouter();
  const { id: workspaceId } = useParams();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user?.name);
  const [users, setUsers] = useState([]);
  const [tempName, setTempName] = "";

  useEffect(() => {
    if (!username) return;
    const socket = connectSocket(workspaceId, username);

    socket.on("updateUsers", (usersList) => {
      setUsers(usersList.map(([_, name]) => name));
    });

    socket.on("sharedStateUpdate", ({ type, key, payload }) => {
      if (type === "replace" || type === "update") {
        dispatch(updateSharedState({ key, payload }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username, workspaceId, dispatch]);

  const handleJoin = () => {
    if (!tempName.trim()) return alert("Enter your name!");
    dispatch({ type: "user/setUser", payload: { name: tempName } });
  };

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
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <div className="w-64 bg-gray-900 text-white p-5 space-y-5">
        <h1 className="text-xl font-bold">Workspace: {workspaceId}</h1>
        <h2 className="text-lg">👥 Users</h2>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={index} className="bg-gray-700 px-3 py-1 rounded">{user}</li>
          ))}
        </ul>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-auto">
        <div className="flex justify-between gap-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <div>
            <ul className="flex gap-1">
              {users.map((user, index) => (
                <li
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-full text-white"
                >
                  {user[0]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-lg p-5 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          <TasksComponent />
        </div>
      </div>
    </div>
  );
}
