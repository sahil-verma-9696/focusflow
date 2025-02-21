import { useEffect, useRef, useState } from "react";

export default function TaskInput({ handleAddTask, isOpen, setIsOpen }) {
  const [task, setTask] = useState({
    title: "",
    assignee: "",
    status: "Backlog",
    deadline: "",
    description: "",
  });

  const statuses = ["Backlog", "Ready", "In progress", "In review", "Done"];
  const menuRef = useRef(null); // Assign ref to the modal div

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

    const assigneesArray = task.assignee.split(",").map((a) => a.trim());
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
    setTask({
      title: "",
      assignee: "",
      status: "Backlog",
      deadline: "",
      description: "",
    });

    setIsOpen(false);
  };

  // ✅ Fix: Assign ref to modal div & prevent event listener from running when closed
  useEffect(() => {
    if (!isOpen) return; // Avoid running effect if modal is closed

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
    <div
      ref={menuRef} // ✅ Assign ref to the root modal div
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md taskinput fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <h2 className="text-xl font-bold mb-4 flex justify-between">
        <span>Add New Task</span>
        <span
          className="font-extralight cursor-pointer close-btn"
          onClick={() => setIsOpen(false)}
        >
          X
        </span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="assignee"
          placeholder="Assignees (comma separated)"
          value={task.assignee}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
