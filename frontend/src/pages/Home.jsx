import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "..";
import NoteCard from "./components/NoteCard";
import Navbar from "./components/Navbar";
import { StickyNote } from "lucide-react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}notes`);
      setNotes(data?.notes);
    } catch (error) {
      console.log("error fetching notes", error);
      toast.error("unable to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {notes?.length === 0 && (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="card w-96 bg-base-100 shadow-xl border border-dashed border-neutral">
              <div className="card-body items-center text-center">
                <StickyNote className="w-12 h-12 text-primary mb-2" />
                <h2 className="card-title text-lg text-neutral-content/50">
                  No Notes Found
                </h2>
                <p className="text-sm text-primary/50">
                  You haven't created any notes yet.
                </p>
              </div>
            </div>
          </div>
        )}

        {notes?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes?.map((note) => (
              <NoteCard key={note?._id} note={note} fetchNotes={fetchNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
