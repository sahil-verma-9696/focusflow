"use client";
import { useState } from "react";
import { useSharedState } from "@/libs/hooks/useSharedState";

export default function TasksComponent() {
  const {
    items: tasks,
    newItemContent,
    setNewItemContent,
    addItem,
    updateItem,
    deleteItem,
  } = useSharedState("tasks");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    if (!newItemContent.trim()) return;
    addItem(newItemContent);
    setNewItemContent("");
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
            <input
              type="text"
              value={task.content}
              onChange={(e) => updateItem(task.id, e.target.value)}
              className="border p-2 rounded w-full text-lg font-medium"
            />
            <button
              onClick={() => deleteItem(task.id)}
              className="mt-2 text-red-500 font-semibold"
            >
              ❌ Delete
            </button>
          </div>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed rounded-lg p-4"
        >
          ➕ New Task
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <input
              type="text"
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              className="border p-3 rounded-lg w-full text-lg"
            />
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
