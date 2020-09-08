const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { sendSuccess, sendError } = require('../lib/senders');
const { generateToken } = require('../helpers/auth');
const { debugError } = require('../config/debug.config');

exports.signUp = async (req, res) => {
  const {
    userName, password,
  } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    userName,
    password: hashed,
  });
  try {
    const doc = await User.findOne({ userName }).exec();
    if (doc) sendError(res, 409, 'User already exists');
    else {
      await newUser.save();
      sendSuccess(res, 201);
    }
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
};

exports.logIn = async (req, res) => {
  try {
    const doc = await User.findOne({ userName: req.body.userName }).select('_id userName password');
    if (doc) {
      const pwdMatch = bcrypt.compareSync(req.body.password, doc.password);
      if (pwdMatch) {
        sendSuccess(res, 200, { token: generateToken(doc) });
      } else sendError(res, 401, 'Incorrect Password');
    } else sendError(res, 401, 'User doesn\'t exist');
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
};
