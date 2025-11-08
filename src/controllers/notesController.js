import createHttpError from 'http-errors';
import Note from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;

  const noteQuery = Note.find({ userId });
  if (tag) {
    noteQuery.where('tag').equals(tag);
  }
  if (search) {
    noteQuery.where({ $text: { $search: search } });
  }

  const [notes, totalNotes] = await Promise.all([
    noteQuery.clone().find().skip(skip).limit(Number(perPage)),
    noteQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId: _id } = req.params;
  const { _id: userId } = req.user;

  const result = await Note.findOne({ _id, userId });

  if (!result) throw createHttpError(404, `Note not found`);

  res.status(200).json(result);
};

export const createNote = async (req, res) => {
  const { _id: userId } = req.user;
  const result = await Note.create({ ...req.body, userId });
  res.status(201).json(result);
};

export const deleteNote = async (req, res) => {
  const { noteId: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await Note.findOneAndDelete({ _id, userId });
  if (!result) throw createHttpError(404, `Note not found`);

  res.status(200).json(result);
};

export const updateNote = async (req, res) => {
  const { noteId: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await Note.findOneAndUpdate({ _id, userId }, req.body, {
    new: true,
  });
  if (!result) throw createHttpError(404, `Note not found`);
  res.status(200).json(result);
};
