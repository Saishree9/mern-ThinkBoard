import mongoose from "mongoose";

// create schema
// create model based off of schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // default created date
  }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
