import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import Menubar from "./Menubar";

const Task = ({ task, onEdit, onDelete,socket }) => {

  const fields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "assignee", label: "Assignee", type: "text", required: false },
    { name: "status", label: "Status", type: "text", required: true },
    { name: "label", label: "Label", type: "text", required: true },
    { name: "deadline", label: "Deadline", type: "datetime-local", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
  ];
  
  
  return (
    <div
      className="bg-white shadow-lg rounded-xl p-4 mb-4 relative w-full max-w-md"
      key={task.id}
    >
      {/* Task Title & Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{task.title}</h1>
        <Menubar
          options={[
            {
              label: "Edit",
              action: () => onEdit(task.id),
            },
            {
              label: "Delete",
              action: () => onDelete(task.id),
            },
          ]}
        />
      </div>

      {/* Task Details */}
      <p className="text-sm text-gray-600 mt-1">
        Assignee: <span className="font-medium">{task.assignee}</span>
      </p>

      {/* Status Badge */}
      <div
        className={`mt-2 text-xs font-medium inline-block px-3 py-1 rounded-full ${getStatusColor(
          task.status
        )}`}
      >
        {task.status}
      </div>

      {/* Deadline */}
      <p className="text-sm text-gray-500 mt-2">Deadline: {task.deadline}</p>

      {/* Description */}
      <p className="text-gray-700 text-sm mt-2">{task.description}</p>
    </div>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "Backlog":
      return "bg-gray-200 text-gray-700";
    case "In progress":
      return "bg-blue-200 text-blue-700";
    case "In review":
      return "bg-yellow-200 text-yellow-700";
    case "Ready":
      return "bg-green-200 text-green-700";
    default:
      return "bg-gray-300 text-gray-800";
  }
};

export default Task;
