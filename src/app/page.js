"use client";
import { useUser } from "../app/context/userContext";
import { useRouter } from "next/navigation";
const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYt3SS-NJD1qJdb7fywQvGxtD7hs8P8pY-Q&s";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div className="md:min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            {user
              ? `Welcome back, ${user.name || "User"}!`
              : "Your Personal Notes, Organized."}
          </h1>
          <p className="text-gray-600 text-lg">
            {user
              ? "Access and manage all your saved notes easily."
              : "Create, manage, and access your notes securely anytime, anywhere."}
          </p>

          {user ? (
            <button
              onClick={() => router.push("/notes/allnotes")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center mx-auto"
            >
              View Your Notes
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div>
          <img
            src={url}
            alt="Notes Illustration"
            className="w-full h-auto max-h-[400px] mx-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
