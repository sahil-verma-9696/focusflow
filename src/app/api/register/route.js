import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { fullName, email, password } = await request.json();

    // Validate request body
    if (!fullName || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "User already exists. Please log in." },
        { status: 409 } // 409 Conflict status
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      fullName,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert into MongoDB
    await usersCollection.insertOne(user);

    // Redirect to Dashboard (Frontend should handle this)
    return Response.json(
      {
        message: "User registered successfully",
        redirectTo: "/dashboard",
        user: user,
      },
      { status: 201 } // 201 Created status
    );
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 } // Internal Server Error
    );
  }
}
