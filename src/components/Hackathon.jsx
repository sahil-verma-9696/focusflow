import React from "react";
import { Calendar, Link as LinkIcon, Trash2, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deleteHackathon } from "@/libs/store/features/hackathons/slice";
import { showAlert } from "@/libs/store/features/alert/slice";

const Hackathon = ({ hackathon }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      key={hackathon.id}
      className="bg-white shadow-xl rounded-2xl p-5 border border-gray-200 flex flex-col justify-between h-80 transition-transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Title & Description */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">
          {hackathon.name}
        </h3>
        <p className="text-gray-600 text-sm mt-2">{hackathon.description}</p>
      </div>

      {/* Date Badge */}
      <div className="mt-3 flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-max">
        <Calendar size={16} />
        <span className="text-sm font-medium">{hackathon.date}</span>
      </div>

      {/* Visit Link */}
      <a
        href={hackathon.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
      >
        <LinkIcon size={18} className="mr-2" /> Visit Hackathon
      </a>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => router.push(`/hackathons/workspace/${hackathon.id}`)}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
        >
          <Edit3 size={18} /> Manage
        </button>
        <button
          onClick={() => {
            dispatch(deleteHackathon(hackathon.id));
            dispatch(
              showAlert({
                type: "error",
                message: `${hackathon.name} 🗑️ Deleted`,
              })
            );
          }}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition"
        >
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </div>
  );
};

export default Hackathon;
