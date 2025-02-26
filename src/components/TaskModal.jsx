"use client";
import { Tag, Users, Calendar, X } from "lucide-react";
import AttendeesInput from "./AttendeesInput";

export default function TaskModal({
  isOpen,
  closeModal,
  newItem,
  setNewItem,
  handleAddTask,
  statuses,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Task</h3>
          <button onClick={closeModal}>
            <X size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          value={newItem.title || ""}
          onChange={(e) =>
            setNewItem((prev) => ({ ...prev, title: e.target.value }))
          }
          className="border p-3 rounded-lg w-full text-lg mb-2"
          placeholder="Task Title"
        />

        {/* Description */}
        <textarea
          value={newItem.description || ""}
          onChange={(e) =>
            setNewItem((prev) => ({ ...prev, description: e.target.value }))
          }
          className="border p-3 rounded-lg w-full text-sm"
          placeholder="Task Description"
        ></textarea>

        {/* Status */}
        <div className="flex items-center gap-2 mt-2">
          <Tag size={16} className="text-gray-500" />
          <select
            value={newItem.status}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, status: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
          >
            {["To Do", "In Progress", "Done"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Attendees */}
        <AttendeesInput
          attendees={newItem.attendees}
          updateAttendees={(newAttendees) =>
            setNewItem((prev) => ({ ...prev, attendees: newAttendees }))
          }
        />

        {/* Due Date */}
        <div className="flex items-center gap-2 mt-2">
          <Calendar size={16} className="text-gray-500" />
          <input
            type="date"
            value={newItem.dueDate || ""}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
