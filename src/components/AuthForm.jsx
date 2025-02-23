"use client";

import { useAppDispatch } from "@/lib/hooks/redux/hooks";
import { showAlert } from "@/lib/store/features/alert/slice";
import { setUser } from "@/lib/store/features/user/slice";
import React, { useState, useEffect } from "react";

const AuthForm = ({ fields, baseUrl, onSuccess, showForm, formType, onClose }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const dispatch = useAppDispatch();

    // Validation function
    const validateField = (name, value) => {
        let errorMessage = "";

        // Define regex rules
        const rules = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
            password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum 8 chars, 1 letter, 1 number
            username: /^[a-zA-Z0-9_]{4,20}$/, // 4-20 chars, alphanumeric + underscore
        };

        if (rules[name] && !rules[name].test(value)) {
            if (name === "email") errorMessage = "Invalid email format!";
            if (name === "password") errorMessage = "Password must be 8+ chars with a number.";
            if (name === "username") errorMessage = "Username should be 4-20 characters long.";
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    // Check form validity whenever formData or errors change
    useEffect(() => {
        const isValid = fields.every(
            (field) => formData[field.name] && !errors[field.name]
        );
        setIsFormValid(isValid);
    }, [formData, errors, fields]);

    async function handleAuth() {
        if (!isFormValid) {
            dispatch(showAlert({ type: "error", message: "Please fill the form correctly!" }));
            return;
        }

        const endpoint = formType === "signup" ? "/auth/signup" : "/auth/login";
        const obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, obj);

            if (response.ok) {
                const data = await response.json();
                dispatch(setUser())
                dispatch(showAlert({ type: "info", message: data.message }));
                if (onSuccess) onSuccess(data);
                onClose();
            } else {
                const data = await response.json();
                dispatch(showAlert({ type: "error", message: data.message || "Authentication failed" }));
            }
        } catch (error) {
            dispatch(showAlert({ type: "error", message: "Something went wrong. Please try again." }));
        }
    }

    if (!showForm) return null;

    return (
        <div className="fixed inset-0 flex items-center text-black justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">{formType === "signup" ? "Signup" : "Login"}</h2>
                {fields.map((field) => (
                    <div key={field.name} className="mb-3">
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            className={`w-full p-2 border rounded text-black ${
                                errors[field.name] ? "border-red-500" : "border-gray-300"
                            }`}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                        />
                        {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                    </div>
                ))}
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button
                        onClick={handleAuth}
                        className={`px-4 py-2 rounded-lg text-white ${
                            isFormValid ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
