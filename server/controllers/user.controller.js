import { Types } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import User from '../models/user.model';
import { sendSuccess, sendError } from '../helpers/senders';
import { generateToken } from '../helpers/auth';
import { debugError } from '../config/debug.config';

export async function signUp(req, res) {
  const {
    userName, password,
  } = req.body;
  const hashed = hashSync(password, 10);
  const newUser = new User({
    _id: new Types.ObjectId(),
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
}

export async function logIn(req, res) {
  try {
    const doc = await User.findOne({ userName: req.body.userName }).select('_id userName password');
    if (doc) {
      const pwdMatch = compareSync(req.body.password, doc.password);
      if (pwdMatch) {
        sendSuccess(res, 200, { token: generateToken(doc) });
      } else sendError(res, 401, 'Incorrect Password');
    } else sendError(res, 401, 'User doesn\'t exist');
  } catch (error) {
    debugError(error);
    sendError(res, 500, error);
  }
}
