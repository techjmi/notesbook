"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import GoogleButton from "@/components/GoogleButton";
const Login = () => {
  const { refreshUser } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signin", formData, {
        withCredentials: true,
      });
      toast.success("Login successful!");
      refreshUser();
      router.push("/profile");
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(message);
    }
  };
  const onGoogleClick = async () => {
    try {
      const user = await handleGoogleLogin();
      console.log("Logged in:", user);
      // redirect or set user context
      refreshUser();
      router.push("/dashboard");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl border">
        <h2 className="text-xl font-semibold text-center mb-5">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        {/* <div className="my-4 text-center text-sm text-gray-500">or</div>
        <GoogleButton onClick={onGoogleClick} /> */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Dont have an account?
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
