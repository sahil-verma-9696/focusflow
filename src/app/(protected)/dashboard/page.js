"use client";

import {withAuth} from "@/utils/withAuth";

function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard! You are logged in.</p>
    </div>
  );
}

export default withAuth(DashboardPage);
