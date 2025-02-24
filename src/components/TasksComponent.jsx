"use client";
import { useSharedState } from "@/libs/hooks/useSharedState";

export default function TasksComponent() {
  const { items: tasks, newItemContent, setNewItemContent, addItem, updateItem, deleteItem } =
    useSharedState("tasks");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded-lg shadow-md bg-white flex flex-col">
            <input
              type="text"
              value={task.content}
              onChange={(e) => updateItem(task.id, e.target.value)}
              className="border p-2 rounded w-full text-lg font-medium"
            />
            <button onClick={() => deleteItem(task.id)} className="mt-2 text-red-500 font-semibold">
              ❌ Delete
            </button>
          </div>
        ))}
        <button onClick={addItem} className="border-2 border-dashed rounded-lg p-4">
          ➕ New Task
        </button>
      </div>
      <div className="mt-6 flex">
        <input
          type="text"
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          className="border p-3 rounded-lg w-full text-lg"
        />
        <button onClick={addItem} className="bg-blue-600 text-white px-5 py-3 rounded-lg ml-2">
          ➕ Add Task
        </button>
      </div>
    </div>
  );
}
