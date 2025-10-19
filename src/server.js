import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import errorHandler from './middleweare/errorHandler.js';
import logger from './middleweare/logger.js';
import notFoundHandler from './middleweare/notFoundHandler.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
