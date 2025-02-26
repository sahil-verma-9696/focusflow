"use client";
import { Users, X } from "lucide-react";

export default function AttendeesInput({ attendees = [], updateAttendees }) {
  const handleRemoveAttendee = (index) => {
    const updated = attendees.filter((_, i) => i !== index);
    updateAttendees(updated);
  };

  const handleAddAttendee = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      updateAttendees([...attendees, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <Users size={16} className="text-gray-500" />
        <input
          type="text"
          onKeyDown={handleAddAttendee}
          className="border p-2 rounded-md text-sm w-full"
          placeholder="Add attendee and press Enter"
        />
      </div>
      
      {/* Attendee List */}
      <div className="mt-2 flex flex-wrap gap-2">
        {attendees?.map((attendee, index) => (
          <div key={index} className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
            {attendee}
            <button onClick={() => handleRemoveAttendee(index)} className="ml-2 text-blue-600 hover:text-blue-800">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
