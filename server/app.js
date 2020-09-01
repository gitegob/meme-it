const express = require('express');
const logger = require('morgan');
const { config } = require('dotenv');
const cors = require('cors');
const memes = require('./routes/meme.routes');
const users = require('./routes/user.routes');
const { sendSuccess } = require('./lib/senders');
const { connectDB } = require('./db/db');

config();
const app = express();

connectDB(app); // Connecting to the Database

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EndPoints
app.get('/', (req, res) => sendSuccess(res, 200, 'Welcome to meme-it'));
app.use('/api/memes', memes);
app.use('/api/auth', users);
app.use('/*', (req, res) => res.status(404).json({ status: 404, error: 'Not found' }));

module.exports = app;
