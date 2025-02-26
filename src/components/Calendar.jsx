import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isPast,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

const Calendar = ({ deadline, tasks = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredTask, setHoveredTask] = useState(null);

  const endDate = new Date(deadline);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="relative mt-2 p-3 bg-white rounded-lg shadow-md w-72 z-0">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-2 py-1 bg-gray-200 rounded-md"
        >
          ◀
        </button>
        <h3 className="text-sm font-semibold text-center">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-2 py-1 bg-gray-200 rounded-md"
        >
          ▶
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-xs text-center font-semibold">
        {weekDays?.map((day, index) => (
          <div key={index} className="p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mt-1">
        {daysInMonth?.map((day, index) => {
          const formattedDate = format(day, "d");
          const past = isPast(day) && !isToday(day);
          const isDeadline = isSameDay(day, endDate);

          // Get tasks for this date
          const tasksForDay = tasks?.filter((task) =>
            isSameDay(new Date(task?.dueDate), day)
          );

          return (
            <div
              key={index}
              className={`relative p-1 text-xs text-center rounded-md border cursor-pointer 
                ${
                  past
                    ? "bg-red-300 text-white border-red-500"
                    : "bg-white text-black"
                } 
                ${
                  isDeadline
                    ? "border-yellow-500 bg-yellow-100"
                    : "border-gray-300"
                }`}
              onMouseEnter={() =>
                tasksForDay.length > 0 && setHoveredTask(tasksForDay)
              }
              onMouseLeave={() => setHoveredTask(null)}
            >
              {formattedDate} {past ? "✅" : isDeadline ? "🏆" : ""}
              {/* Attendee Icons (Initials) */}
              <div className="flex justify-center flex-col mt-1 gap-1">
                {tasksForDay.slice(0, 3)?.map((task, i) => (
                  <span
                    key={i}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-blue-500 text-white rounded-full"
                  >
                    {task?.attendees?.[0]?.charAt(0).toUpperCase() || "?"}
                  </span>
                ))}
                {tasksForDay.length > 3 && (
                  <span className="text-xs font-semibold">
                    +{tasksForDay.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Hover Popup */}
      {hoveredTask && (
        <div className="absolute top-0 left-0 right-0 mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
          <h4 className="font-bold">Tasks:</h4>
          {hoveredTask?.map((task, i) => (
            <div key={i} className="mt-1">
              <p>
                <span className="font-semibold">{task.title}</span> -{" "}
                {task.status}
              </p>
              <p className="text-gray-300">👥 {task.attendees.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
