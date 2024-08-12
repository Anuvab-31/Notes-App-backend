import { Router } from "express";
import { addNote, editNote,getAllNotes ,deleteNote,updatePinnedNote} from "../controllers/notes.controller.js";
import { authenticationToken } from "../utils/utilities.js";

const router = Router()

router.route("/add-note").post(authenticationToken, addNote);
router.route("/edit-note/:noteId").put(authenticationToken, editNote);
router.route("/get-all-notes").get(authenticationToken, getAllNotes);
router.route("/delete-note/:noteId").delete(authenticationToken, deleteNote);
router.route("/update-pinned-note/:noteId").put(authenticationToken, updatePinnedNote);

export default router