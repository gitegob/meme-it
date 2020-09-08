const mongoose = require('mongoose');
const Meme = require('../models/meme.model');
const { sendSuccess, sendError } = require('../lib/senders');
const { debugError } = require('../config/debug.config');

exports.createMeme = (req, res) => {
  const { meme } = req.body;
  const newMeme = new Meme({
    _id: new mongoose.Types.ObjectId(),
    author: req.payload._id,
    meme,
  });
  newMeme.save().then((doc) => {
    sendSuccess(res, 201, doc);
  }).catch((error) => {
    debugError(error);
    sendError(res, 500, error);
  });
};

exports.getMemes = async (req, res) => {
  try {
    const docs = await Meme.find().select('authorName meme _id').populate('author', 'userName');
    const memes = docs.map((doc) => ({ ...doc._doc, address: `${process.env.BASEURL}/api/memes/${doc._id}` }));
    sendSuccess(res, 200, { count: docs.length, memes });
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
};

exports.getMeme = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Meme.findById(id).select('authorName meme _id').populate('author', 'userName');
    if (doc)sendSuccess(res, 200, doc);
    else sendError(res, 404, 'Meme not found');
  } catch (error) {
    sendError(res, 500, error);
  }
};

exports.deleteMeme = async (req, res) => {
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
};

exports.updateMeme = async (req, res) => {
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
};
