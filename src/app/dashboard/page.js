"use client";
import React from "react";
import style from "./page.css";
import Sidebar from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux/hooks";
import TaskInput from "@/components/TaskInput";

const page = () => {
  const tasks = useAppSelector((store) => store.tasks);
  const dispatch = useAppDispatch();
  function handleAddTask() {}
  return (
    <main className="dashboard-main">
      <section className="view-nav">
        <ul>
          <li>board</li>
        </ul>
      </section>
      <section className="task-container">
        <div className="task-1 task">
          <h2>In Progress</h2>
          <ul>
            {tasks?.map((task) => {
              if (task.status === "In progress") {
                return (
                  <li key={task.id}>
                    <div className="task-title">{task.title}</div>
                    <div className="task-assignee">{task.assignee}</div>
                    <div className="task-deadline">{task.deadline}</div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="task add-btn">
          <div onClick={handleAddTask} className="button-wrapper">
            <button>+</button>
            <span>Add Task</span>
          </div>

          <TaskInput />
        </div>
      </section>
    </main>
  );
};

export default page;
