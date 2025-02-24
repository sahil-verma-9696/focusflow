"use client";
import { useState } from "react";
import { useSharedState } from "@/libs/hooks/useSharedState";

export default function TasksComponent() {
  const {
    items: tasks,
    newItem,
    setNewItem,
    addItem,
    updateItem,
    deleteItem,
  } = useSharedState("tasks");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    if (!newItem.title.trim() || !newItem.description.trim()) return;
    addItem();
    setNewItem({ title: "", description: "" }); // Reset after adding
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
          >
            {/* Task Title */}
            <input
              type="text"
              value={task.title || ""} // Ensure default value
              onChange={(e) => updateItem(task.id, { title: e.target.value })}
              className="border p-2 rounded w-full text-lg font-bold"
              placeholder="Task Title"
            />

            {/* Task Description */}
            <textarea
              value={task.description || ""} // Ensure default value
              onChange={(e) =>
                updateItem(task.id, { description: e.target.value })
              }
              className="border p-2 rounded w-full mt-2 text-sm"
              placeholder="Task Description"
            ></textarea>

            {/* Delete Button */}
            <button
              onClick={() => deleteItem(task.id)}
              className="mt-2 text-red-500 font-semibold"
            >
              ❌ Delete
            </button>
          </div>
        ))}

        {/* Add New Task Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center"
        >
          ➕ New Task
        </button>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>

            {/* Title Input */}
            <input
              type="text"
              value={newItem.title || ""} // Ensure default value
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, title: e.target.value }))
              }
              className="border p-3 rounded-lg w-full text-lg mb-2"
              placeholder="Task Title"
            />

            {/* Description Input */}
            <textarea
              value={newItem.description || ""} // Ensure default value
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, description: e.target.value }))
              }
              className="border p-3 rounded-lg w-full text-sm"
              placeholder="Task Description"
            ></textarea>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                ➕ Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
