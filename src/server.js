import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.use(notFoundHandler);
//
app.use(errors());
//
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
