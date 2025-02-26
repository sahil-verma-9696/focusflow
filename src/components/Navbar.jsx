"use client";

import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Menubar from "./Menubar";
import ShareButton from "./ShareButton";
import { logout } from "@/libs/store/features/auth/slice";
import { showAlert } from "@/libs/store/features/alert/slice";
import DarkModeToggle from "./DarkmodeToggle";
import { CONST_APP_NAME } from "@/utils/constant";

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const user = useSelector((state) => state.auth?.user);
  const router = useRouter();
  const getColorForLetter = (letter) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
    ];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  const userInitial = user?.name ? user.name[0].toUpperCase() : "G";
  const bgColor = getColorForLetter(userInitial);

  async function handleAuth() {
    if (user?.name) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/logout"
      );
      if (response.ok) {
        dispatch(logout());
        dispatch(
          showAlert({ type: "success", message: "Logged out successfully" })
        );
      } else {
        dispatch(showAlert({ type: "error", message: "Failed to logout" }));
      }
      return;
    } else {
      router.push("/auth/login");
    }
  }

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between p-4 px-12 shadow-md bg-white">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-text-light tracking-wide">
        {CONST_APP_NAME}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {pathname.includes("/workspace/") && <ShareButton />}

        {/* User Avatar */}
        <div
          className={`size-10 ${bgColor} rounded-full text-xl text-white flex justify-center items-center shadow-lg`}
        >
          {userInitial}
        </div>

        {/* Menu */}
        <Menubar
          options={[
            { label: user?.name ? user.name : "Guest" },
            {
              label: user?.name ? "Logout" : "Login/Signup",
              action: handleAuth,
            },
          ]}
          className="text-white"
        />
        <DarkModeToggle />
      </div>
    </nav>
  );
}
