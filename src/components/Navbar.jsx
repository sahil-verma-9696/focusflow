"use client";

import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Menubar from "./Menubar";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const pathname = usePathname();
  const [workspaceLink, setWorkspaceLink] = useState("");

  useEffect(() => {
    setWorkspaceLink(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const copyLink = () => {
    navigator.clipboard.writeText(workspaceLink);
    alert("Workspace link copied!");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-red-800 text-white">
      <h1 className="text-lg font-bold">{user.name || "Guest"}</h1>

      <Menubar
        options={[
          {
            label: user.name,
          },
        ]}
      />
      {workspaceLink.includes("/workspace/") && (
        <button onClick={copyLink} className="bg-blue-600 px-3 py-1 rounded">
          Share
        </button>
      )}
    </nav>
  );
}
