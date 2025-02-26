"use client";
import { useState } from "react";
import { useSharedState } from "@/libs/hooks/useSharedState";
import { motion } from "framer-motion";

export default function LabelsComponent() {
  const {
    items: labels,
    newItemContent,
    setNewItemContent,
    addItem,
    updateItem,
    deleteItem,
  } = useSharedState("labels");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLabel = () => {
    if (!newItemContent.trim()) return;
    addItem(newItemContent);
    setNewItemContent("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏷 Labels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {labels?.map((label) => (
          <div
            key={label.id}
            className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
          >
            <input
              type="text"
              value={label.content}
              onChange={(e) => updateItem(label.id, e.target.value)}
              className="border p-2 rounded w-full text-lg font-medium"
            />
            <button
              onClick={() => deleteItem(label.id)}
              className="mt-2 text-red-500 font-semibold"
            >
              ❌ Delete
            </button>
          </div>
        ))}

        {/* Button with rectangular shadow illusion */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-full h-full rounded-lg"
            animate={{
              boxShadow: [
                "0px 0px 10px rgba(128, 0, 128, 0.3), 0px 0px 10px  rgba(128, 0, 128, 0.5)",
                "0px 0px 10px rgba(75, 0, 130, 0.5), 0px 0px 10px  rgba(75, 0, 130, 0.7)",
                "0px 0px 10px rgba(148, 0, 211, 0.5), 0px 0px 10px  rgba(148, 0, 211, 0.7)",
                "0px 0px 10px rgba(75, 0, 130, 0.5), 0px 0px 10px   rgba(75, 0, 130, 0.7)",
                "0px 0px 10px rgba(128, 0, 128, 0.3), 0px 0px 10px  rgba(128, 0, 128, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed rounded-lg p-4 bg-white relative shadow-lg w-full h-full"
          >
            ➕ New Label
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Label</h3>
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
                onClick={handleAddLabel}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg "
              >
                ➕ Add Label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
