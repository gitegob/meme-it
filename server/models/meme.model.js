const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  meme: { type: String, required: true },
});

module.exports = mongoose.model('Meme', memeSchema);
