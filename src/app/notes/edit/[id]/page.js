"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
const EditNotePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fetchNote = async () => {
    try {
      const res = await axios.get(`/api/notes/${id}`, {
        withCredentials: true,
      });
      setNote({ title: res.data.note.title, content: res.data.note.content });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to fetch note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ once: true });
    if (id) fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      return toast.warn("Both title and content are required");
    }
    try {
      setSaving(true);
      const res = await axios.put(`/api/notes/${id}`, note, {
        withCredentials: true,
      });
      toast.success("Note updated successfully");
      router.push("/notes/allnotes");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to update note");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <p className="text-center py-10">Loading...</p>;
  return (
    <div className="md:w-1/2 mx-auto md:px-4 py-10 px-2 w-full">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-blue-600 hover:underline cursor-pointer"
      >
        <AiOutlineArrowLeft className="mr-2" size={18} />
        Back to Notes
      </button>

      <div
        data-aos="fade-up"
        className="rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              Title
            </label>
            <input
              type="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Note title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              Content
            </label>
            <textarea
              rows="8"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 resize-none"
              placeholder="Write your note here..."
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600  cursor-pointer px-3 py-2 rounded-2xl hover:bg-green-800 transition disabled:opacity-50 "
          >
            {saving ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
      {/* <div className="box1"></div> */}
    </div>
  );
};

export default EditNotePage;

