"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "@/utils/socket";
import { setHackathons } from "@/libs/store/features/hackathons/slice";

export default function HackathonDashboard({ params }) {
  const hackathonId = use(params)?.id;
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user.name);
  const [participants, setParticipants] = useState([]);
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  useEffect(() => {
    if (!username) return;
    const socket = connectSocket(hackathonId, username);

    socket.on("updateUsers", (participantsList) => {
      setParticipants(
        participantsList.map((user) => {
          console.log(user);
          return `${user[1]}` || user;
        })
      );
    });

    socket.on("taskUpdate", ({ type, payload }) => {
      if (type === "sync") {
        setTasks({
          todo: payload.tasks.filter((t) => t.status === "todo"),
          inProgress: payload.tasks.filter((t) => t.status === "inProgress"),
          completed: payload.tasks.filter((t) => t.status === "completed"),
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username, hackathonId, dispatch]);

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-bold">
          Enter your name to join Hackathon
        </h1>
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
    <div className="p-5 grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Participants Card */}
      <div className="bg-white p-4 shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold">👥 Participants</h2>
        <ul className="mt-2 space-y-1">
          {participants.length > 0 ? (
            participants.map((user, index) => <li key={index}>{user}</li>)
          ) : (
            <p className="text-gray-500">No participants yet.</p>
          )}
        </ul>
      </div>

      {/* Task Board */}
      <div className="col-span-2 grid grid-cols-3 gap-4">
        {Object.entries(tasks).map(([status, taskList]) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">
              {status.toUpperCase()}
            </h3>
            <div className="mt-2 space-y-2">
              {taskList.length > 0 ? (
                taskList.map((task) => (
                  <div key={task.id} className="bg-white p-3 shadow rounded-lg">
                    <h4 className="font-semibold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No tasks yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
