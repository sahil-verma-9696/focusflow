"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "@/utils/socket";
import { updateSharedState } from "@/libs/store/features/shared/slice";
import TasksComponent from "@/components/TasksComponent";
import Calendar from "@/components/Calendar";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { showAlert } from "@/libs/store/features/alert/slice";
import { withAuth } from "@/utils/withAuth";

 function WorkspacePage() {
  const { id: workspaceId } = useParams();
  const hackathon = useSelector((store) => store.hackathons).find(
    (hack) => hack.id === workspaceId
  );
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user?.name);
  const tasks = useSelector((store) => store.shared.tasks);
  const [users, setUsers] = useState([]);
  const [tempName, setTempName] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // console.log(users)

  useEffect(() => {
    if (!username) return;
    const socket = connectSocket(workspaceId, username);
    if(socket){
      dispatch(showAlert({type:"info",message:"Connect from workspace"}))
    }else{
      return
    }
    socket.on("updateUsers", (usersList) => {
      setUsers(usersList?.map(([_, name]) => name));
    });

    socket.on("sharedStateUpdate", ({ type, key, payload }) => {
      if (type === "replace" || type === "update") {
        dispatch(updateSharedState({ key, payload }));
      }
    });

    return () => {
      socket.disconnect();
      dispatch(showAlert({type:"info",message:"Disconnect from Workspace"}))
    };
  }, [username, workspaceId, dispatch]);

  useEffect(() => {
    const deadline = new Date(hackathon.date);
    const updateTimer = () => {
      const now = new Date();
      setTimeLeft({
        days: differenceInDays(deadline, now),
        hours: differenceInHours(deadline, now) % 24,
        minutes: differenceInMinutes(deadline, now) % 60,
        seconds: differenceInSeconds(deadline, now) % 60,
      });
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [hackathon.date]);

  const handleJoin = () => {
    if (!tempName.trim()) return alert("Enter your name!");
    dispatch({ type: "user/setUser", payload: { name: tempName } });
  };

  if(!users){
    return ;
  }
  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        <h1 className="text-2xl font-bold">
          Enter your name to join workspace
        </h1>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="border p-2 rounded w-64"
          placeholder="Your Name"
        />
        <button
          onClick={handleJoin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Join Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-5">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-5">
        {/* Participants */}
        <div className="w-1/3 bg-gray-100 p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Participants</h2>
          <ul className="flex flex-wrap gap-2">
            {users?.map((user, index) => (
              <li
                key={index}
                className="bg-gray-700 px-3 py-1 rounded-full text-white"
              >
                {user[0]}
              </li>
            ))}
          </ul>
        </div>

        {/* Hackathon Details */}
        <div className="flex-1 bg-white shadow-lg p-5 rounded-xl ml-5">
          <h1 className="text-2xl font-bold mb-2">{hackathon.name}</h1>
          <p className="text-gray-600 mb-2">{hackathon.description}</p>
          <p className="text-gray-500">📅 Deadline: {hackathon.date}</p>
          <a
            href={hackathon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 block"
          >
            🔗 Visit Hackathon
          </a>
        </div>

        {/* Calendar & Timer */}
        <div className="ml-5">
          <Calendar deadline={hackathon.date} small tasks={tasks || []} />
          <div className="mt-3 text-center bg-gray-800 text-white p-3 rounded-lg">
            <h2 className="text-lg font-bold">⏳ Time Left</h2>
            <p className="text-xl">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow-lg p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Tasks</h2>
        <TasksComponent />
      </div>
    </div>
  );
}


export default withAuth(WorkspacePage)