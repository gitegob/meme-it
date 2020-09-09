import { Schema, model } from 'mongoose';

const memeSchema = Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  meme: { type: String, required: true },
});

export default model('Meme', memeSchema);
