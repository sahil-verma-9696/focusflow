import React from "react";
import style from "./page.css";
import Sidebar from "@/components/Sidebar";

const page = () => {
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
        </div>
      </section>
    </main>
  );
};

export default page;
