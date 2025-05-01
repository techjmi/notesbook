"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";
const Todays = () => {
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchNotes("today");
  }, []);
  const fetchNotes = async (type) => {
    try {
      const res = await axios.get(`/api/notes?type=${type}`, { withCredentials: true });
      setNotes(res.data.notes);
    } catch (err) {
      toast.error("Failed to fetch today's notes");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`, { withCredentials: true });
      toast.success("Note deleted");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="w-full mx-auto md:min-h-screen px-2">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Today's Notes
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="relative group border border-gray-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-all"
            >
              <button
                onClick={() => router.push(`/notes/view/${note._id}`)}
                className="absolute top-3 left-3 text-gray-500 hover:text-blue-600"
                title="View"
              >
                <AiOutlineEye size={20} />
              </button>

              <h2 className="font-semibold text-lg text-gray-900 mb-2">
                {note.title}
              </h2>
              <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-6">
                {note.content}
              </p>

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
          ))
        ) : (
          <p>No notes for today.</p>
        )}
      </div>
    </div>
  );
};

export default Todays;
