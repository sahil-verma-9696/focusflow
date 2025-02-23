"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSocket } from "@/utils/socket";
import {
  addHackathon,
  updateHackathon,
  deleteHackathon,
  setHackathons,
} from "@/libs/store/features/hackathons/slice";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function HackathonManager() {
  const dispatch = useDispatch();
  const workspaceId = useSelector((state) => state.user.workspaceId);
  const hackathons = useSelector((state) => state.hackathons.hackathons);
  const socket = getSocket();
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    description: "",
    link: "",
    date: "",
  });
  const router = useRouter();
  // ✅ Sync real-time updates from server
  useEffect(() => {
    if (!socket) return;

    socket.on("sharedStateUpdate", ({ type, payload }) => {
      if (type === "sync" || type === "replace") {
        dispatch(setHackathons(payload.hackathons || []));
      } else if (type === "update" || type === "delete") {
        dispatch(setHackathons(payload.hackathons));
      }
    });

    return () => {
      socket.off("sharedStateUpdate");
    };
  }, [socket, dispatch]);

  // ✅ Add a new hackathon
  const handleAddHackathon = () => {
    if (!newHackathon.name.trim()) return;

    const newEntry = { id: uuidv4(), ...newHackathon };
    const updatedHackathons = [...hackathons, newEntry];

    dispatch(addHackathon(newEntry));
    socket.emit("sharedStateUpdate", {
      type: "update",
      payload: { hackathons: updatedHackathons },
    });

    setNewHackathon({ name: "", description: "", link: "", date: "" });
  };

  // ✅ Update hackathon
  const handleUpdateHackathon = (id, field, value) => {
    const updatedHackathons = hackathons.map((hackathon) =>
      hackathon.id === id ? { ...hackathon, [field]: value } : hackathon
    );

    dispatch(updateHackathon({ id, field, value }));
    socket.emit("sharedStateUpdate", {
      type: "update",
      payload: { hackathons: updatedHackathons },
    });
  };

  // ✅ Delete hackathon
  const handleDeleteHackathon = (id) => {
    const updatedHackathons = hackathons.filter(
      (hackathon) => hackathon.id !== id
    );

    dispatch(deleteHackathon(id));
    socket.emit("sharedStateUpdate", {
      type: "delete",
      payload: { hackathonId: id },
    });
  };

  // ✅ Manage button click handler
  function handleManageBtn() {
    router.push(`/workspace/${workspaceId}`);
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">🏆 Hackathons</h2>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-white shadow-lg rounded-xl p-4 border flex flex-col justify-between h-80"
          >
            <div>
              <h3 className="text-xl font-bold text-blue-700">
                {hackathon.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {hackathon.description}
              </p>
              <p className="text-gray-500 text-sm mt-2">📅 {hackathon.date}</p>
              <a
                href={hackathon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                🔗 Visit Hackathon
              </a>
            </div>

            {/* Buttons */}
            <div className="mt-3 flex gap-4">
              <button
                onClick={handleManageBtn}
                className="bg-blue-500 text-white px-3 py-2 rounded w-full"
              >
                📝 Manage
              </button>
              <button
                onClick={() => handleDeleteHackathon(hackathon.id)}
                className="bg-red-500 text-white px-3 py-2 rounded w-full"
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Hackathon */}
      <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-100 max-w-md mx-auto">
        <h3 className="text-lg font-semibold">➕ Add New Hackathon</h3>
        <div className="mt-3 flex flex-col space-y-2">
          <input
            type="text"
            value={newHackathon.name}
            onChange={(e) =>
              setNewHackathon({ ...newHackathon, name: e.target.value })
            }
            placeholder="Hackathon Name"
            className="border p-2 rounded w-full"
          />
          <textarea
            value={newHackathon.description}
            onChange={(e) =>
              setNewHackathon({ ...newHackathon, description: e.target.value })
            }
            placeholder="Description"
            className="border p-2 rounded w-full"
          />
          <input
            type="url"
            value={newHackathon.link}
            onChange={(e) =>
              setNewHackathon({ ...newHackathon, link: e.target.value })
            }
            placeholder="Hackathon Link"
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={newHackathon.date}
            onChange={(e) =>
              setNewHackathon({ ...newHackathon, date: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddHackathon}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            ➕ Add Hackathon
          </button>
        </div>
      </div>
    </div>
  );
}
