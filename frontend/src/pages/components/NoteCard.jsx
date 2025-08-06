import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../lib/utils";
import axios from "axios";
import { BASE_URL } from "../..";
import toast from "react-hot-toast";

const NoteCard = ({ key, note, fetchNotes }) => {
  const navigate = useNavigate();

  const handleDeleteNote = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete the note?")) return;
    try {
      const { data } = await axios.delete(`${BASE_URL}notes/${id}`);
      if (data?.success) {
        toast.success(data?.message);
        fetchNotes();
      }
    } catch (error) {
      console.log("error while deleting note", error);
    }
  };

  return (
    <div
      // onClick={() => navigate(`/noteDetails/${note?._id}`)}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] "
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note?.title}</h3>
        <h3 className="line-climp-3 text-base-content/70">
          {note?.content.length > 20
            ? note?.content?.slice(0, 100)?.concat("...")
            : note?.content}
        </h3>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note?.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(`/noteDetails/${note?._id}`)}
            />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDeleteNote(e, note?._id)}
            >
              <Trash2Icon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
