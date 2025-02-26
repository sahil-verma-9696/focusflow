"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addHackathon } from "@/libs/store/features/hackathons/slice";
import { setWorkspaceId } from "@/libs/store/features/auth/slice";

export default function AddHackathonForm({ showForm, setShowForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hackathon Added:", { name, description, link, date });

    if (!name.trim()) return alert("Enter Hackathon Name!");

    const workspaceId = `${name}-${Math.random().toString(36).substr(2, 8)}`;
    dispatch(setWorkspaceId(workspaceId));
    dispatch(addHackathon({ name, description, link, date, workspaceId }));
    router.push(`/workspace/${workspaceId}`);
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={() => setShowForm(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Hackathon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Hackathon Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Hackathon Description
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Hackathon Link</label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Hackathon Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ➕ Add Hackathon
          </button>
        </form>
      </div>
    </div>
  );
}
