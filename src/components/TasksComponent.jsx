"use client";
import { useState } from "react";
import { useSharedState } from "@/libs/hooks/useSharedState";
import { Grid, Table, TimerReset, PlusCircle } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import TableView from "./TableView";
import TimelineView from "./TimelineView";

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
  const statuses = ["To Do", "In Progress", "Done"];
  const [view, setView] = useState("grid");

  const handleAddTask = () => {
    if (!newItem.title.trim() || !newItem.description.trim()) return;
    addItem();
    setNewItem({
      title: "",
      description: "",
      status: "To Do",
      attendees: [],
      dueDate: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">📋 Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <Grid size={18} />
            Grid View
          </button>

          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <Table size={18} />
            Table View
          </button>

          <button
            onClick={() => setView("timeline")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              view === "timeline" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <TimerReset size={18} />
            Timeline View
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} /> Add Task
        </button>
      </div>

      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              updateItem={updateItem}
              deleteItem={deleteItem}
              statuses={statuses}
            />
          ))}
        </div>
      )}

      {view === "table" && (
        <TableView
          tasks={tasks}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      )}

      {view === "timeline" && <TimelineView tasks={tasks} />}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddTask={handleAddTask}
          statuses={statuses}
        />
      )}
    </div>
  );
}
