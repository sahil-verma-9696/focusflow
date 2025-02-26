"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!user) {
        router.replace("/auth/login"); // Redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    }, [user, router]);

    if (!user || loading) {
      return (
        <div className="flex items-center justify-center h-screen text-xl font-semibold">
          Loading...
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export const withoutAuth = (Component) => {
  return function PublicComponent(props) {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
      if (user) {
        router.replace("/dashboard"); // Redirect logged-in users away from auth pages
      }
    }, [user, router]);

    return <Component {...props} />;
  };
};
