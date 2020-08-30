const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  authorName: { type: String, required: true },
  meme: { type: String, required: true },
});

module.exports = mongoose.model('Meme', memeSchema);
