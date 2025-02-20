import { useState } from "react";

export default function TaskInput({ handleAddTask }) {
  const [task, setTask] = useState({
    title: "",
    assignee: "",
    status: "Backlog",
    deadline: "",
    description: "",
  });

  const statuses = ["Backlog", "Ready", "In progress", "In review", "Done"];

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

    // Convert comma-separated assignees into an array
    const assigneesArray = task.assignee.split(",").map((a) => a.trim());

    const newTask = {
      id: Date.now(), // Generate unique ID
      title: task.title,
      assignee: assigneesArray,
      status: task.status,
      deadline: task.deadline,
      description: task.description,
      "create At": new Date().toISOString(),
      "modify At": new Date().toISOString(),
    };

    handleAddTask(newTask); // Pass task to parent component
    setTask({
      title: "",
      assignee: "",
      status: "Backlog",
      deadline: "",
      description: "",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md fixed top-0">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
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
