"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ShareButton() {
  const [workspaceLink, setWorkspaceLink] = useState("");
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setWorkspaceLink(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const copyLink = () => {
    navigator.clipboard.writeText(workspaceLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={copyLink} className="bg-blue-600 px-3 py-1 rounded text-white">
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
