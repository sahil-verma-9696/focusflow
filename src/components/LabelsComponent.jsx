"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSocket, sendSharedStateUpdate } from "@/utils/socket";
import {
  updateSharedState,
  replaceSharedState,
  mergeSharedState,
} from "@/libs/store/features/shared/slice";
import { v4 as uuidv4 } from "uuid";

export default function LabelsComponent() {
  const socket = getSocket();
  const dispatch = useDispatch();

  const labels = useSelector((state) => state.shared.labels || []);
  const [newLabelName, setNewLabelName] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("sharedStateUpdate", ({ type, key, payload }) => {
      if (type === "sync") {
        dispatch(replaceSharedState(payload));
      } else if (type === "merge") {
        dispatch(mergeSharedState({ key, payload }));
      } else if (type === "update") {
        dispatch(updateSharedState({ key, payload }));
      }
    });

    return () => {
      socket.off("sharedStateUpdate");
    };
  }, [socket, dispatch]);

  // Add a new label
  const handleAddLabel = () => {
    if (!newLabelName.trim()) return;

    const newLabel = { id: uuidv4(), name: newLabelName };
    if (labels.some((label) => label.id === newLabel.id)) return;

    dispatch(updateSharedState({ key: "labels", payload: [...labels, newLabel] }));
    sendSharedStateUpdate("merge", "labels", [newLabel]);

    setNewLabelName("");
  };

  const handleUpdateLabel = (id, newName) => {
    const updatedLabels = labels.map((label) =>
      label.id === id ? { ...label, name: newName } : label
    );

    dispatch(updateSharedState({ key: "labels", payload: updatedLabels }));
    sendSharedStateUpdate("update", "labels", updatedLabels);
  };

  // Delete a label
  const handleDeleteLabel = (id) => {
    const updatedLabels = labels.filter((label) => label.id !== id);

    dispatch(updateSharedState({ key: "labels", payload: updatedLabels }));
    sendSharedStateUpdate("update", "labels", updatedLabels);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-3">🏷 Labels</h2>

      <div className="space-y-2">
        {labels.map((label) => (
          <div
            key={label.id}
            className="p-2 border rounded flex justify-between"
          >
            <input
              type="text"
              value={label.name}
              onChange={(e) => handleUpdateLabel(label.id, e.target.value)}
              className="border p-1 rounded w-full mr-2"
            />
            <button
              onClick={() => handleDeleteLabel(label.id)}
              className="text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={newLabelName}
          onChange={(e) => setNewLabelName(e.target.value)}
          placeholder="Enter label name..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddLabel}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        >
          ➕ Add Label
        </button>
      </div>
    </div>
  );
}
