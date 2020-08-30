const mongoose = require('mongoose');
const debug = require('debug')('app:memes.controller');
const Meme = require('../models/meme.model');
const { sendSuccess, sendError } = require('../utils/senders');

exports.createMeme = (req, res) => {
  const { name, meme } = req.body;
  const newMeme = new Meme({
    _id: new mongoose.Types.ObjectId(),
    authorName: name,
    meme,
  });
  newMeme.save().then((doc) => {
    sendSuccess(res, 201, doc);
  }).catch((error) => {
    debug(error);
    sendError(res, 500, error.message);
  });
};

exports.getMemes = (req, res) => {
  Meme.find()
    .select('authorName meme _id')
    .exec()
    .then((docs) => {
      const memes = docs.map((doc) => ({ ...doc._doc, address: `${process.env.BASEURL}/api/memes/${doc._id}` }));
      sendSuccess(res, 200, { count: docs.length, memes });
    })
    .catch((error) => {
      debug(error);
      sendError(res, 500, error.message);
    });
};

exports.getMeme = (req, res) => {
  const { id } = req.params;
  Meme.findById(id)
    .select('authorName meme _id')
    .exec()
    .then((doc) => {
      if (doc)sendSuccess(res, 200, doc);
      else sendError(res, 404, 'Meme not found');
    })
    .catch((error) => {
      debug(error);
      sendError(res, 500, error.message);
    });
};

exports.deleteMeme = (req, res) => {
  const { id } = req.params;
  Meme.remove({ _id: id })
    .exec()
    .then((result) => {
      if (result.n) sendSuccess(res, 200);
      else sendError(res, 404, 'Meme doesn\'t exist');
    }).catch((error) => {
      debug(error);
      sendError(res, 500, error.message);
    });
};

exports.updateMeme = (req, res) => {
  const { id } = req.params;
  Meme.updateOne({ _id: id }, { $set: { ...req.body } })
    .exec()
    .then((result) => {
      if (result.n)sendSuccess(res, 200);
      else sendError(res, 400, 'Couldn\'t update, Try again');
    }).catch((error) => {
      debug(error);
      sendError(res, 500, error.message);
    });
};
