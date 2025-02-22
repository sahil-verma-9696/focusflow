import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TaskInput({ handleAddTask, handleEditTask, isOpen, setIsOpen, editingTask }) {
  const [task, setTask] = useState({
    title: "",
    assignee: "",
    status: "Backlog",
    deadline: "",
    description: "",
  });

  const statuses = ["Backlog", "Ready", "In progress", "In review", "Done"];
  const menuRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setTask({
        ...editingTask,
        assignee: Array.isArray(editingTask.assignee) ? editingTask.assignee.join(", ") : editingTask.assignee || "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.deadline) {
      alert("Title and Deadline are required!");
      return;
    }

    // Ensure assignee is a string before splitting
    const assigneesArray = typeof task.assignee === "string" 
      ? task.assignee.split(",").map((a) => a.trim()) 
      : [];

    if (editingTask) {
      handleEditTask({
        id: editingTask.id,
        updatedTask: {
          ...task,
          assignee: assigneesArray,
          modifiedAt: new Date().toISOString(),
        },
      });
    } else {
      const newTask = {
        id: Date.now(),
        title: task.title,
        assignee: assigneesArray,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };

      handleAddTask(newTask);
    }

    setTask({
      title: "",
      assignee: "",
      status: "Backlog",
      deadline: "",
      description: "",
    });

    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-between">
          <span>{editingTask ? "Edit Task" : "Add New Task"}</span>
          <span className="cursor-pointer text-gray-200 hover:text-red-400 transition" onClick={() => setIsOpen(false)}>✖</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="title" 
            placeholder="Task Title" 
            value={task.title} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input 
            type="text" 
            name="assignee" 
            placeholder="Assignees (comma separated)" 
            value={task.assignee} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select 
            name="status" 
            value={task.status} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <input 
            type="date" 
            name="deadline" 
            value={task.deadline} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea 
            name="description" 
            placeholder="Task Description" 
            value={task.description} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button 
            type="submit" 
            className="w-full bg-white text-indigo-600 font-semibold p-3 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
