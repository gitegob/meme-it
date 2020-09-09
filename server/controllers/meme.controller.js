import { Types } from 'mongoose';
import Meme from '../models/meme.model';
import { sendSuccess, sendError } from '../helpers/senders';
import { debugError } from '../config/debug.config';

export function createMeme(req, res) {
  const { meme } = req.body;
  const newMeme = new Meme({
    _id: new Types.ObjectId(),
    author: req.payload._id,
    meme,
  });
  newMeme.save().then((doc) => {
    sendSuccess(res, 201, doc);
  }).catch((error) => {
    debugError(error);
    sendError(res, 500, error);
  });
}

export async function getMemes(req, res) {
  try {
    const docs = await Meme.find().select('authorName meme _id').populate('author', 'userName');
    const memes = docs.map((doc) => ({ ...doc._doc, address: `${process.env.BASEURL}/api/memes/${doc._id}` }));
    sendSuccess(res, 200, { count: docs.length, memes });
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
}

export async function getMeme(req, res) {
  const { id } = req.params;
  try {
    const doc = await Meme.findById(id).select('authorName meme _id').populate('author', 'userName');
    if (doc)sendSuccess(res, 200, doc);
    else sendError(res, 404, 'Meme not found');
  } catch (error) {
    sendError(res, 500, error);
  }
}

export async function deleteMeme(req, res) {
  const { id } = req.params;
  try {
    const doc = await Meme.findOne({ _id: id, author: req.payload._id });
    if (!doc) sendError(res, 403, 'Delete unauthorized');
    else {
      const result = await Meme.deleteOne({ _id: id });
      if (result.n)sendSuccess(res, 200);
      else sendError(res, 400, 'Delete failed, Try again');
    }
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
}

export async function updateMeme(req, res) {
  const { id } = req.params;
  try {
    const doc = await Meme.findOne({ _id: id, author: req.payload._id });
    if (!doc) sendError(res, 403, 'Update unauthorized');
    else {
      const result = await Meme.findOneAndUpdate({ _id: id },
        { $set: { ...req.body } }, { new: true });
      if (result)sendSuccess(res, 200, result);
      else sendError(res, 400, 'Update failed, Try again');
    }
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
}
