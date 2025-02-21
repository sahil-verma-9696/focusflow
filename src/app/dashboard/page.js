"use client";
import style from "./page.css";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux/hooks";
import TaskInput from "@/components/TaskInput";
import { addTask } from "@/lib/store/features/tasks/slice";
import {
  addLabel,
  deleteLabel,
  renameLabel,
} from "@/lib/store/features/labels/slice";
import Task from "@/components/Task";
import Menubar from "@/components/Menubar";

const Page = () => {
  const dispatch = useAppDispatch();
  const labels = useAppSelector((state) => state.labels);
  const tasks = useAppSelector((state) => state.tasks);

  // Track open task inputs for each label
  const [openTaskInputs, setOpenTaskInputs] = useState({});

  function handleAddTask(task) {
    dispatch(addTask(task));
  }

  const handleAddLabel = () => {
    const label = prompt("Enter a label name");
    if (label) {
      dispatch(addLabel({ id: Math.random(), name: label }));
    }
  };

  const toggleTaskInput = (labelId) => {
    setOpenTaskInputs((prev) => ({
      ...prev,
      [labelId]: !prev[labelId], // Toggle specific label
    }));
  };

  return (
    <main className="dashboard-main">
      <section className="dashboard-header">
        <h1>Task Manager</h1>
        <button onClick={handleAddLabel}>+ Add Label</button>
      </section>
      <section className="label-section">
        {labels?.map((label) => (
          <div key={label.id} className="label">
            <div className="label-header">
              <h1>{label.name}</h1>
              <Menubar
                options={[
                  {
                    label: "➕ Add task",
                    action: () => toggleTaskInput(label.id), // Open only for this label
                  },
                  {
                    label: "📝 Rename Label",
                    action: () => {
                      const newName = prompt("Enter a new label name")
                        .toLowerCase()
                        .trim();
                      if (newName) {
                        dispatch(renameLabel({ id: label.id, newName }));
                      }
                    },
                  },
                  {
                    label: "❌ Delete Label",
                    action: () => dispatch(deleteLabel(label.id)),
                  },
                ]}
              />
            </div>

            {/* Task Input (Only for this label) */}
            {openTaskInputs[label.id] && (
              <TaskInput
                handleAddTask={handleAddTask}
                isOpen={openTaskInputs[label.id]}
                setIsOpen={() => toggleTaskInput(label.id)}
              />
            )}

            <ul>
              {tasks
                ?.filter(
                  (task) =>
                    task.status.toLowerCase() === label.name.toLowerCase()
                )
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Page;
