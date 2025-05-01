"use client";
import GoogleButton from "@/components/GoogleButton";
import { handleGoogleLogin } from "@/utility/googleLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { refreshUser } = useUser();
  // const router = useRouter();
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, password } = formData;
    if (!email || !name || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }
      toast.success("Signup successful!");
      setFormData({ email: "", name: "", password: "" });
      router.push("/login");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };
  const onGoogleClick = async () => {
    try {
      const user = await handleGoogleLogin();
      // console.log("Logged in:", user);
      // redirect or set user context
      refreshUser();
      router.push("/dashboard");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <GoogleButton onClick={onGoogleClick} />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <Link href="/login" className="text-indigo-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
