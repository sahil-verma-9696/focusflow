import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // Ensure this function is correctly implemented
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Handle POST requests to /api/login
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate request body
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 } // Unauthorized
      );
    }

    // Verify password (compare hashed password)
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // Set token in HTTP-only cookie for security
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === "production", // Secure flag in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 } // Internal Server Error
    );
  }
}
