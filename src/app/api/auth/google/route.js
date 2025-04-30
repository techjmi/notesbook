import { cookies } from "next/headers";
import connectDB from "../../db";
import N_User from "../../models/user";
import jwt from 'jsonwebtoken';  
export async function POST(req) {
  try {
    await connectDB();
    const { name, email, image } = await req.json();
    // Ensure name and email are provided
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), { status: 400 });
    }
    // Check if the user already exists in the database
    let user = await N_User.findOne({ email });
    if (!user) {
      // If user doesn't exist, create a new one
      user = new N_User({ name, email, image });
      await user.save();
    }
    // Generate JWT token after user verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: "12h" });
    console.log(token)
    // Save the token to cookies (for use in protected routes)
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  
      maxAge: 60 * 60 * 12,  
      sameSite: "strict",
      path: "/",
    });
    return new Response(JSON.stringify({ message: "Google login successful", user }), { status: 200 });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
