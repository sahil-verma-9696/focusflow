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
import Hackathon from "./Hackathon";

export default function HackathonManager({ hackathonId }) {
  const dispatch = useDispatch();
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
    const updatedHackathons = hackathons?.map((hackathon) =>
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
  function handleManageBtn(id) {
    router.push(`/workspace/${id}`);
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">🏆 Hackathons</h2>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <Hackathon hackathon={hackathon}/>
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
// {/* <div className="p-5 grid gap-6 grid-cols-1 md:grid-cols-3">
//       {/* Participants Card */}
//       <div className="bg-white p-4 shadow-lg rounded-xl">
//         <h2 className="text-lg font-semibold">👥 Participants</h2>
//         <ul className="mt-2 space-y-1">
//           {participants.length > 0 ? (
//             participants.map((user, index) => <li key={index}>{user}</li>)
//           ) : (
//             <p className="text-gray-500">No participants yet.</p>
//           )}
//         </ul>
//       </div>

//       {/* Tasks by Labels */}
//       <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//         {labels.map((label) => (
//           <div key={label.id} className="bg-gray-100 p-4 rounded-lg shadow">
//             <h3 className="text-lg font-bold text-gray-700">{label.name.toUpperCase()}</h3>
//             <div className="mt-2 space-y-2">
//               {tasks.filter((task) => task.label === label.name).length > 0 ? (
//                 tasks
//                   .filter((task) => task.label === label.name)
//                   .map((task) => (
//                     <Task
//                       key={task.id}
//                       task={task}
//                       onEdit={(id) => console.log("Edit", id)}
//                       onDelete={(id) => console.log("Delete", id)}
//                     />
//                   ))
//               ) : (
//                 <p className="text-gray-500">No tasks under this label.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div> */}
