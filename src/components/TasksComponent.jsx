// TasksComponent.jsx
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

export default function TasksComponent() {
  const socket = getSocket();
  const dispatch = useDispatch();

  // Ensure `tasks` exists in state and is always an array
  const tasks = useSelector((state) => state.shared.tasks || []);
  const [newTaskContent, setNewTaskContent] = useState("");

  useEffect(() => {
    if (!socket) return;
  
    socket.on("sharedStateUpdate", ({ type, key, payload }) => {
      if (type === "sync") {
        dispatch(replaceSharedState(payload));
      } else if (type === "merge") {
        dispatch(mergeSharedState({ key, payload }));
      } else if (type === "update") {
        dispatch(updateSharedState({ key, payload }));
      } else if (type === "delete") {
        dispatch(removeSharedKey({ key }));
      }
    });
  
    return () => {
      socket.off("sharedStateUpdate");
    };
  }, [socket, dispatch]); // ✅ Now it listens for ANY state change (cards + tasks)
  

  // Add a new task
  const handleAddTask = () => {
    if (!newTaskContent.trim()) return;

    const newTask = { id: uuidv4(), content: newTaskContent };
    if (tasks.some((task) => task.id === newTask.id)) return;

    dispatch(updateSharedState({ key: "tasks", payload: [...tasks, newTask] }));
    sendSharedStateUpdate("merge", "tasks", [newTask]);

    setNewTaskContent("");
  };

  // Update a task
  const handleUpdateTask = (id, newContent) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, content: newContent } : task
    );

    dispatch(updateSharedState({ key: "tasks", payload: updatedTasks }));
    sendSharedStateUpdate("update", "tasks", updatedTasks);
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    dispatch(updateSharedState({ key: "tasks", payload: updatedTasks }));
    sendSharedStateUpdate("update", "tasks", updatedTasks);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-3">📋 Tasks</h2>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-2 border rounded flex justify-between"
          >
            <input
              type="text"
              value={task.content}
              onChange={(e) => handleUpdateTask(task.id, e.target.value)}
              className="border p-1 rounded w-full mr-2"
            />
            <button
              onClick={() => handleDeleteTask(task.id)}
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
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          placeholder="Enter task content..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        >
          ➕ Add Task
        </button>
      </div>
    </div>
  );
}
