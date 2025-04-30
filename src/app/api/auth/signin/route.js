
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../db";
import N_User from "../../models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  const user = await N_User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{
    expiresIn: "12h",
  });
  console.log(token)
  const { password: _, ...userWithoutPassword } = user._doc;
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    sameSite: "strict",
    path: "/",
  });
  return NextResponse.json(
    { message: "Login successful", user: userWithoutPassword },
    { status: 200 }
  );
}
