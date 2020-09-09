import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { config } from 'dotenv';
import cors from 'cors';
import memes from './routes/meme.routes';
import users from './routes/user.routes';
import { sendSuccess } from './helpers/senders';
import connectDB from './db/db';

config();
const app = express();

connectDB(app); // Connecting to the Database

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

// EndPoints
app.get('/', (req, res) => sendSuccess(res, 200, 'Welcome to meme-it'));
app.use('/api/memes', memes);
app.use('/api/auth', users);
app.use('/*', (req, res) => res.status(404).json({ status: 404, error: 'Not found' }));

export default app;
