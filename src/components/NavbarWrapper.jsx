"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hiddenNavbarRoutes = ["/register", "/login"];

  if (hiddenNavbarRoutes.includes(pathname)) {
    return null; // Don't render Navbar on these routes
  }

  return <Navbar />;
}
