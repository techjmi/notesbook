"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { isToday, isBefore, isAfter, endOfToday } from "date-fns";

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

  const truncateWords = (text, wordLimit = 30) => {
    const words = text.trim().split(/\s+/);
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(" ") + " ...";
  };

  const getNoteCategory = (noteDate) => {
    const date = new Date(noteDate);
    if (isToday(date)) return "today";
    if (isBefore(date, new Date())) return "past";
    if (isAfter(date, endOfToday())) return "upcoming";
    return "unknown";
  };

  const getTagStyle = (type) => {
    switch (type) {
      case "today":
        return "bg-yellow-100 text-yellow-800";
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "past":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTagLabel = (type) => {
    switch (type) {
      case "today":
        return "Today";
      case "upcoming":
        return "Upcoming";
      case "past":
        return "Past";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="w-full mx-auto md:min-h-screen px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Your Notes
        </h1>
        <button
          onClick={() => router.push("/notes/create")}
          className="bg-blue-600  px-4 cursor-pointer py-2 rounded hover:bg-blue-700 transition w-fit"
        >
          + Create New Note
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => {
          const category = getNoteCategory(note.date);
          return (
            <div
              key={note._id}
              data-aos="fade-up"
              className="relative group border border-gray-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-all"
            >
              {/* Tag Label */}
              <div
                className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded ${getTagStyle(
                  category
                )}`}
              >
                {getTagLabel(category)}
              </div>

              {/* Eye Icon */}
              <button
                onClick={() => router.push(`/notes/view/${note._id}`)}
                className="absolute top-3 left-3 text-gray-500 hover:text-blue-600 cursor-pointer"
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

              {/* Footer Action Buttons */}
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
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
