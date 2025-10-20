import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import errorHandler from './middleweare/errorHandler.js';
import logger from './middleweare/logger.js';
import notFoundHandler from './middleweare/notFoundHandler.js';

import Note from './models/note.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/notes', async (req, res) => {
  const result = await Note.find();
  res.json(result);
});

app.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findById(noteId);
  if (!result) {
    return res.status(404).json({ message: `Notes not found` });
  }
  res.json(result);
});

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
