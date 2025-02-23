"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { connectSocket } from "@/utils/socket";

export default function HackathonDashboard({ params }) {
  const hackathonId = use(params)?.id;
  const router = useRouter();
  const username = useSelector((state) => state.user.user?.name);
  const tasks = useSelector((store) => store.shared.tasks);
  const labels = useSelector((store) => store.shared.labels);

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!username) return;
    const socket = connectSocket(hackathonId, username);

    socket.on("updateUsers", (participantsList) => {
      setParticipants(participantsList.map((user) => user[1] || user));
    });

    return () => {
      socket.disconnect();
    };
  }, [username, hackathonId]);

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
    <div className="p-5 grid gap-6 grid-cols-1 md:grid-cols-4">
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

      {/* Labels with Tasks */}
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {labels.map((label) => {
          const filteredTasks = tasks.filter(
            (task) => task.label === label.name
          );
          return (
            <div key={label.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-700">{label.name}</h3>
              <div className="mt-2 space-y-2">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-3 shadow rounded-lg"
                    >
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-gray-600">
                        {task.description || "No description"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No tasks yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
