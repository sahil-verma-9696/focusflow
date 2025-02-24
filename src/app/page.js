<<<<<<< HEAD
import styles from "./page.css";
export default function Home() {
  return (
    <div>
      <main>
        <section className="part-1">
          i am part 1
        </section>
      </main>
=======
"use client"
import AddHackathonForm from "@/components/AddHackathonForm";
import { useState } from "react";

export default function Home() {
  const [isShowCreateTeamForm, setIsShowCreateTeamForm] = useState(false);
  console.log(process.env.NEXT_SERVER_URL);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AddHackathonForm
        showForm={isShowCreateTeamForm}
        setShowForm={setIsShowCreateTeamForm}
      />

      <h1 className="text-3xl font-bold mb-6 text-black">
        Welcome to Collaboration Hub
        {process.env.SERVER_URL}
      </h1>
      <div className="flex gap-6">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
          <span className="text-xl" onClick={()=>setIsShowCreateTeamForm(true)}>➕ Add Hackathon</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition">
          Join Team
        </button>
      </div>
>>>>>>> finalbr
    </div>
  );
}
