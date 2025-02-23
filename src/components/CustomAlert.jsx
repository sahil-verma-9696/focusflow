"use client"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "./../lib/store/features/alert/slice";

const CustomAlert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.alert);

  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => dispatch(clearAlert()), 1500); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer); // Clear the timer on unmount
    }
  }, [alert, dispatch]);

  if (!alert) return null;

  const alertStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 right-5 px-4 py-2 w-fit rounded-lg text-white shadow-lg ${
        alertStyles[alert.type] || "bg-gray-500"
      }`}
    >
      {alert.message}
    </div>
  );
};

export default CustomAlert;