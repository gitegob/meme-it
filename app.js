const express = require('express');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('morgan');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const memes = require('./routes/memes.routes');
const { sendSuccess } = require('./utils/senders');

config();
const app = express();
const port = process.env.PORT || 5000;

// Connecting to the Database
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    dbDebugger('Database connected...');
  })
  .catch((error) => {
    dbDebugger('Database Connection Failed');
    dbDebugger(error);
  });
db.on('error', (error) => { dbDebugger(error); });

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EndPoints
app.get('/', (req, res) => sendSuccess(res, 200, 'Welcome to meme-it'));
app.use('/api/memes', memes);
app.use('/*', (req, res) => res.status(404).json({ status: 404, error: 'Not found' }));

// Server Starter
app.listen(port, () => debug(`Server running on port ${port}...`));

module.exports = app;
