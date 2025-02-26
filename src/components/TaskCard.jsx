"use client";
import { Tag, Users, Calendar, Trash2, X } from "lucide-react";
import AttendeesInput from "./AttendeesInput";

export default function TaskCard({ task, updateItem, deleteItem }) {
  return (
    <div className="p-5 border rounded-lg shadow-lg bg-white flex flex-col hover:shadow-xl transition">
      {/* Title */}
      <input
        type="text"
        value={task.title || ""}
        onChange={(e) => updateItem(task.id, { title: e.target.value })}
        className="border-none outline-none text-lg font-bold bg-transparent"
        placeholder="Task Title"
      />

      {/* Description */}
      <textarea
        value={task.description || ""}
        onChange={(e) => updateItem(task.id, { description: e.target.value })}
        className="border-none outline-none bg-transparent mt-2 text-sm resize-none"
        placeholder="Task Description"
      ></textarea>

      {/* Status Dropdown */}
      <div className="flex items-center gap-2 mt-2">
        <Tag size={16} className="text-gray-500" />
        <select
          value={task.status}
          onChange={(e) => updateItem(task.id, { status: e.target.value })}
          className="bg-gray-200 p-1 rounded-md text-sm"
        >
          {["To Do", "In Progress", "Done"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Attendees Input */}
      <AttendeesInput
        attendees={task.attendees}
        updateAttendees={(newAttendees) =>
          updateItem(task.id, { attendees: newAttendees })
        }
      />

      {/* Due Date Input */}
      <div className="flex items-center gap-2 mt-2">
        <Calendar size={16} className="text-gray-500" />
        <input
          type="date"
          value={task.dueDate || ""}
          onChange={(e) => updateItem(task.id, { dueDate: e.target.value })}
          className="border p-1 rounded-md text-sm w-full"
        />
      </div>

      {/* Delete Button */}
      <button
        onClick={() => deleteItem(task.id)}
        className="mt-3 text-red-500 flex items-center gap-1 hover:text-red-600 transition"
      >
        <Trash2 size={18} /> Delete
      </button>
    </div>
  );
}
