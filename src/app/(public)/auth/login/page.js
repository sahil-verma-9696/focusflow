"use client";
import { showAlert } from "@/libs/store/features/alert/slice";
import { loginSuccess } from "@/libs/store/features/auth/slice";
import { withoutAuth } from "@/utils/withAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain letters and numbers."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(loginSuccess({ user: data.user, token: data.token }));

          router.push("/dashboard");

          dispatch(showAlert({ type: "success", message: data.message }));
        } else {
          dispatch(showAlert({ type: "error", message: data.message }));
        }
      } catch (error) {
        dispatch(showAlert({ type: "error", message: error.message }));
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <header className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-32" />
        </header>
        <main>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <p className="text-gray-600">Enter your credentials to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Not have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </main>
        <footer className="mt-6 text-center text-sm text-gray-500">
          <select className="mb-2 p-1 border rounded">
            <option>English (United States)</option>
          </select>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default withoutAuth(Page);
