"use client";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { withAuth } from "@/utils/withAuth";

function Dashboard() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-xl font-semibold">Welcome to Collab Hub</h2>
      <p className="mt-2">
        Manage your workspaces and collaborate in real time.
      </p>

      <div className="mt-4 p-4 bg-accent-light dark:bg-accent-dark rounded shadow">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <ul className="mt-2">
          <li className="p-2 border-b">User A created a new workspace</li>
          <li className="p-2 border-b">User B edited a document</li>
          <li className="p-2">User C joined the workspace</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-accent-light dark:bg-accent-dark rounded shadow">
        <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
        <ul className="mt-2">
          <li className="p-2 border-b">Team Sync - 10:00 AM</li>
          <li className="p-2 border-b">Project Review - 2:00 PM</li>
          <li className="p-2">Client Discussion - 4:30 PM</li>
        </ul>
      </div>
    </main>
  );
}

export default withAuth(Dashboard);
