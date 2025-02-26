"use client";
import { useSelector } from "react-redux";
import HackathonManager from "@/components/HackathonManager";
import Hackathon from "@/components/Hackathon";
import { PlusCircle } from "lucide-react";
import { withAuth } from "@/utils/withAuth";

function HackathonPage() {
  const user = useSelector((state) => state.auth.user);
  const hackathons = useSelector((store) => store.hackathons);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🛠️ Manage Hackathons
        </h1>
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => console.log("Open Add Hackathon Modal")}
        >
          <PlusCircle size={20} /> Add Hackathon
        </button>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons?.length > 0 ? (
          hackathons?.map((hackathon) => (
            <Hackathon key={hackathon.id} hackathon={hackathon} />
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center">
            No hackathons available. 📭 Click "Add Hackathon" to create one!
          </p>
        )}
      </div>
    </div>
  );
}
export default withAuth(HackathonPage);
