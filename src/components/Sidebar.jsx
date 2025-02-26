"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  Settings,
  Menu,
  MoveRight,
  MoveLeft,
  HomeIcon,
} from "lucide-react";
import { CONST_APP_NAME } from "@/utils/constant";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <aside
        className={` h-screen bg-white text-gray-900 shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <nav className="flex flex-col h-full space-y-4 p-4 relative">
          {/* Fixed Toggle Button */}
          <div className="flex absolute left-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute z-10 min-w-[24px] top-0  p-2 bg-gray-100 shadow-md rounded-full hover:bg-gray-200 transition"
            >
              {isOpen ? <MoveLeft size={20} /> : <Menu size={20} />}
            </button>

            <span
              className={`pl-12 pt-1 font-semibold text-2xl whitespace-nowrap ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
              }`}
            >
              {CONST_APP_NAME}
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="mt-10 space-y-2 mr-4">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >
                {/* <HomeIcon size={34} className="min-w-[34px] " /> */}

                <span
                  className={`font-semibold text-3xl ml-3 transition-all duration-300 whitespace-nowrap ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  }`}
                >
                  {/* {CONST_APP_NAME} */}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <LayoutDashboard size={24} className="min-w-[24px] " />
                <span
                  className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  }`}
                >
                  Dashboard 🏡
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/hackathons"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <Home size={24} className="min-w-[24px]" />
                <span
                  className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  }`}
                >
                  Hackathons 📌
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <Settings size={24} className="min-w-[24px]" />
                <span
                  className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                  }`}
                >
                  Settings ⚙️
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
