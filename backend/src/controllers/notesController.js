import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 newest one come at the top
    res
      .status(200)
      .json({ notes, message: "Notes fetched successfully", success: true });
  } catch (error) {
    console.log("error is getALLNotes", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

export async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ note, message: "Note fetched successfully", success: true });
  } catch (error) {
    console.log("error is getNotesById", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json({
      note: savedNote,
      message: "Note created successfully",
      success: true,
    });
  } catch (error) {
    console.log("error is createNote", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ note: updatedNote, message: "Note Updated Successfully", success: true });
  } catch (error) {
    console.log("error in updating notes", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ message: "Note Deleted Successfully", success: true });
  } catch (error) {
    console.log("error in deleting notes", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
