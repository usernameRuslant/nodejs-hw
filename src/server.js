import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import errorHandler from './middleweare/errorHandler.js';
import logger from './middleweare/logger.js';
import notFoundHandler from './middleweare/notFoundHandler.js';

import notesRouters from './routes/notesRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use('/notes', notesRouters);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
