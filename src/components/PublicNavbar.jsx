"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const PublicNavbar = () => {
  const router = useRouter()
  return (
    <nav className="sticky top-0 w-full bg-white dark:bg-background-dark shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark">
        <Link href={"/"}>
        CollabHub
        </Link>
      </h1>

      <div>
        <Link href="/about" className="px-4">
          About
        </Link>
        <Link href="/hackathons" className="px-4">
          Hackathons
        </Link>
        <button
        onClick={()=>{router.push("/auth/login")}}
         className="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-lg">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
