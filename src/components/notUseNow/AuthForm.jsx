"use client";

import { showAlert } from "@/libs/store/features/alert/slice";
import { loginSuccess } from "@/libs/store/features/auth/slice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthForm = ({ baseUrl, onSuccess, onClose }) => {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  const fields = [
    { name: "email", type: "email", placeholder: "Enter your email" },
    { name: "password", type: "password", placeholder: "Enter your password" },
  ];

  if (formType === "signup") {
    fields.unshift({
      name: "name",
      type: "text",
      placeholder: "Choose a name",
    });
  }

  const validateField = (name, value) => {
    let errorMessage = "";
    const rules = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      name: /^[a-zA-Z0-9_]{4,20}$/,
    };
    if (rules[name] && !rules[name].test(value)) {
      if (name === "email") errorMessage = "Invalid email format!";
      if (name === "password")
        errorMessage = "Password must be 8+ chars with a number.";
      if (name === "name")
        errorMessage = "name should be 4-20 characters long.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  useEffect(() => {
    const isValid = fields.every(
      (field) => formData[field.name] && !errors[field.name]
    );
    setIsFormValid(isValid);
  }, [formData, errors]);

  async function handleAuth() {
    if (!isFormValid) {
      dispatch(
        showAlert({ type: "error", message: "Please fill the form correctly!" })
      );
      return;
    }
    const endpoint =
      formType === "signup" ? "/api/auth/signup" : "/api/auth/login";
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess({ user: data?.user, isAuthenticated: true }));
        dispatch(showAlert({ type: "info", message: data.message }));
        if (onSuccess) onSuccess(data);
        onClose();
      } else {
        dispatch(
          showAlert({
            type: "error",
            message: data.message || "Authentication failed",
          })
        );
      }
    } catch (error) {
      dispatch(
        showAlert({
          type: "error",
          message: "Something went wrong. Please try again.",
        })
      );
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          {formType === "signup" ? "Create an Account" : "Welcome Back"}
        </h2>
        {fields.map((field) => (
          <div key={field.name} className="mb-3">
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className={`w-full p-2 border rounded focus:ring focus:ring-blue-300 ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              }`}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name]}</p>
            )}
          </div>
        ))}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-500 hover:underline">
            Cancel
          </button>
          <button
            onClick={handleAuth}
            className={`px-4 py-2 rounded-lg text-white ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            {formType === "signup" ? "Sign Up" : "Login"}
          </button>
        </div>
        <p className="text-center text-sm">
          {formType === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setFormType("login")}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setFormType("signup")}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
