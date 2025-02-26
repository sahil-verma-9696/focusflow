"use client";
import { showAlert } from "@/libs/store/features/alert/slice";
import { loginSuccess } from "@/libs/store/features/auth/slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation (min 8 chars, at least 1 letter and 1 number)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Step validation function
  const validateStep = () => {
    let newErrors = {};

    if (step === 1 && !firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (step === 2 && !validateEmail(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (step === 3 && !validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain letters and numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // API call on final step
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: firstName + " " + lastName,
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
    <div className="fixed inset-0 flex items-center justify-center flex-col bg-background-light">
      <div className="w-[70%]">
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <header className="mb-4">
            <img src="/logo.png" alt="Logo" className="w-20" />
          </header>
          <main className="flex justify-between">
            <div className="mb-6">
              <h1 className="text-text-light font-extralight text-3xl">
                Create a Collab Hack Account
              </h1>
              <p className="text-gray-600">
                {step === 1 && "Enter your name"}
                {step === 2 && "Enter your email"}
                {step === 3 && "Create a password"}
              </p>
            </div>
            <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-4 w-[50%]">
              {step === 1 && (
                <>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">
                      Last name (optional)
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="float-right bg-blue-600 text-white py-2 px-6 rounded-3xl hover:bg-blue-700"
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            </form>
          </main>
        </div>
        <footer className="flex justify-between mt-6 text-center text-sm text-gray-500 w-full">
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

export default Auth;
