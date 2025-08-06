import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { BASE_URL } from "..";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchNote = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}notes/${id}`);
      console.log("data?.note", data);
      if (data?.success) {
        setNote(data?.note);
      }
    } catch (error) {
      console.log("error fetching note by id", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    toast.dismiss();
    if (!window.confirm("Are you sure you want to delete the note?")) return;
    try {
      const { data } = await axios.delete(`${BASE_URL}notes/${note?._id}`);
      if (data?.success) {
        toast.success(data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error while deleting note", error);
    }
  };
  const handleSave = async () => {
    setSaving(true);

    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please fill all the fields")
      return
    }

    const reqBody = {
      title: note?.title,
      content: note?.content,
    };

    try {
      const { data } = await axios.put(`${BASE_URL}notes/${note?._id}`, reqBody);
      console.log("data", data)
      if(data?.success){
        toast.success(data?.message)
        navigate("/")
      }
    } catch (error) {
      console.log("error while updating note", error);
    } finally{
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="bg-base-200 flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon size={20} /> Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outl">
              <Trash2Icon size={20} /> Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note?.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note?.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
