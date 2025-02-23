"use client";

import React, { useState } from "react";
import AuthForm from "./AuthForm";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("login");

  console.log(process.env.BASE_URL)

  const handleOpenForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleOpenForm("login")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400"
        >
          Login
        </button>
        <button
          onClick={() => handleOpenForm("signup")}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-400"
        >
          Signup
        </button>
      </div>
      {showForm && (
        <AuthForm
          fields={[
            { name: "name", type: "text", placeholder: "Username" },
            { name: "email", type: "email", placeholder: "Email"},
            { name: "password", type: "password", placeholder: "Password", isrequired: true },
          ]}
          baseUrl={"https://f1e4-103-224-48-66.ngrok-free.app"}
          onSuccess={() => setShowForm(false)}
          showForm={showForm}
          formType={formType}
          onClose={() => setShowForm(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
