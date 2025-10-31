import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRouters = Router();

notesRouters.get('/', getAllNotes);

notesRouters.get('/:noteId', celebrate(noteIdSchema), getNoteById);

notesRouters.post('/', celebrate(createNoteSchema), createNote);

notesRouters.delete('/:noteId', celebrate(noteIdSchema), deleteNote);

notesRouters.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default notesRouters;
