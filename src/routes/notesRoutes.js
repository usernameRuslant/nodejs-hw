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
  getAllNotesSchema,
  createNoteSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import authenticate from '../middleware/authenticate.js';

const notesRoutes = Router();

notesRoutes.use(authenticate);

notesRoutes.get('/', celebrate(getAllNotesSchema), getAllNotes);

notesRoutes.get('/:noteId', celebrate(noteIdSchema), getNoteById);

notesRoutes.post('/', celebrate(createNoteSchema), createNote);

notesRoutes.delete('/:noteId', celebrate(noteIdSchema), deleteNote);

notesRoutes.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default notesRoutes;
