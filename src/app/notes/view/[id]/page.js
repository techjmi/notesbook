'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
const NoteDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchNote = async () => {
    try {
      const res = await axios.get(`/api/notes/${id}`, { withCredentials: true });
      setNote(res.data.note);
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

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!note) return <p className="text-center py-10">Note not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-blue-600 hover:underline"
      >
        <AiOutlineArrowLeft className="mr-2" size={18} />
        Back to Notes
      </button>

      <div
        data-aos="fade-up"
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {note.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Created on {formatDate(note.createdAt)}
        </p>
        <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
          {note.content}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
