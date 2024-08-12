
import { Note } from "../models/note.model.js";

//create note
const addNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    //title
    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    //content
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" })
    }

    try {

        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully"
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

}

//edit note
const editNote = async (req, res) => {

    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    //title
    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }


    try {

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

}

//get all notes
const getAllNotes = async (req, res) => {

    const { user } = req.user;

    try {

        const note = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        return res.json({
            error: false,
            note,
            message: "All notes fetched successfully"
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

}

//delete note
const deleteNote = async (req, res) => {

    const noteId = req.params.noteId;
    const { user } = req.user;

    try {

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

}


//update is pinned
const updatePinnedNote = async (req, res) => {

    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        note.isPinned = isPinned;
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note pinned successfully"
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

}

export { addNote, editNote, getAllNotes, deleteNote, updatePinnedNote }
