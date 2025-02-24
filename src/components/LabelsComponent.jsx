"use client";
import { useSharedState } from "@/libs/hooks/useSharedState";

export default function LabelsComponent() {
  const { items: labels, newItemContent, setNewItemContent, addItem, updateItem, deleteItem } =
    useSharedState("labels");

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-3">🏷 Labels</h2>
      <div className="space-y-2">
        {labels.map((label) => (
          <div key={label.id} className="p-2 border rounded flex justify-between">
            <input
              type="text"
              value={label.content}
              onChange={(e) => updateItem(label.id, e.target.value)}
              className="border p-1 rounded w-full mr-2"
            />
            <button onClick={() => deleteItem(label.id)} className="text-red-500">
              ❌
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded ml-2">
          ➕ Add Label
        </button>
      </div>
    </div>
  );
}
