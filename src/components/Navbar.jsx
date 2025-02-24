"use client";

import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Menubar from "./Menubar";
import AuthForm from "./AuthForm";

export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("login");
  const user = useSelector((state) => state.user.user);

  const pathname = usePathname();
  const [workspaceLink, setWorkspaceLink] = useState("");

  const handleOpenForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  useEffect(() => {
    setWorkspaceLink(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const copyLink = () => {
    navigator.clipboard.writeText(workspaceLink);
    alert("Workspace link copied!");
  };

  function handleSignup() {
    alert("Sign up clicked!");
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white-800">
      <h1 className="text-3xl font-bold">FOCUS-FLOW</h1>

      <div className="flex items-center gap-4">
        <Menubar
          options={[
            {
              label: user?.name,
            },
            {
              label: "Sign Up",
              action: () => handleOpenForm("signup"),
            },
            {
              label: "Logout",
            },
          ]}
        />

        {/* Display Profile */}
        <div className="size-10 bg-white rounded-full text-3xl text-black flex justify-center items-center">
          {user?.name ? user?.name[0] : "G"}
        </div>

        {/* Form */}
        {showForm && (
          <AuthForm
            fields={[
              { name: "name", type: "text", placeholder: "Username" },
              { name: "email", type: "email", placeholder: "Email" },
              {
                name: "password",
                type: "password",
                placeholder: "Password",
                isrequired: true,
              },
            ]}
            baseUrl={process.env.NEXT_PUBLIC_SERVER_URL}
            onSuccess={() => setShowForm(false)}
            showForm={showForm}
            formType={formType}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Share btn */}
        {workspaceLink.includes("/workspace/") && (
          <button onClick={copyLink} className="bg-blue-600 px-3 py-1 rounded">
            Share
          </button>
        )}
      </div>
    </nav>
  );
}
