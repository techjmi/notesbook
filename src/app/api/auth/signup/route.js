import bcrypt from "bcryptjs";
import N_User from "../../models/user";
import connectDB from "../../db";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    // Basic field validations
    if (!name || name.trim() === "") {
      return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });
    }
    if (!email || email.trim() === "") {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }
    // if (!password || password.length < 6) {
    //   return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), { status: 400 });
    // }
    // Check if user exists
    const existingUser = await N_User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create and save user
    const newUser = new N_User({ name, email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: "Signup successful", user: newUser }), { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
