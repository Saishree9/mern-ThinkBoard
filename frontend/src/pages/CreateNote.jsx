import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "..";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();

    toast.dismiss();
    if (!title) {
      toast.error("Enter Title");
      return;
    } else if (!content) {
      toast.error("Enter Content");
      return;
    }
    const reqBody = {
      title,
      content,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}notes`, reqBody);
      console.log("data", data);
      if (data?.success) {
        toast.success(data?.message);
        setTitle("");
        setContent("");
        navigate("/");
      }
    } catch (error) {
      console.log("error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            {" "}
            <ArrowLeftIcon size={20} /> Back To Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={createNote}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
