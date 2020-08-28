const express = require('express');
const logger = require('morgan');
const { config } = require('dotenv');

config();
const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome to meme-it' });
});

app.listen(port, () => console.log(`Listening on ${port}`));
module.exports = app;
