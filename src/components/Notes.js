
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
const Notes = () => {
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  const fetchNotes = async () => {
    try {
      const res = await axios.get("/api/notes", { withCredentials: true });
      setNotes(res.data.notes);
    } catch (err) {
      toast.error("Failed to fetch notes");
    }
  };
  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`, { withCredentials: true });
      toast.success("Note deleted");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to delete note";
      toast.error(msg);
    }
  };
  // Utility to truncate content to first 30 words
  const truncateWords = (text, wordLimit = 30) => {
    const words = text.trim().split(/\s+/);
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(" ") + " ...";
  };
  return (
    <div className="">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note._id}
            data-aos="fade-up"
            className="relative group border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all"
          >
            {/* Eye Icon */}
            <button
              onClick={() => router.push(`/notes/view/${note._id}`)}
              className="absolute top-3 left-3 text-gray-500 hover:text-blue-600"
              title="View"
            >
              <AiOutlineEye size={20} />
            </button>

            {/* Card Content */}
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              {note.title}
            </h2>
            <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-6">
              {truncateWords(note.content)}
            </p>

            {/* Action Buttons */}
            <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => router.push(`/notes/edit/${note._id}`)}
                title="Edit"
                className="text-gray-500 hover:text-green-600"
              >
                <AiOutlineEdit size={18} />
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                title="Delete"
                className="text-gray-500 hover:text-red-600"
              >
                <AiOutlineDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
