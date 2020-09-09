import { sign, verify } from 'jsonwebtoken';

export function generateToken({
  _id, userName,
}) { return sign({ _id, userName }, process.env.JWT_KEY, { expiresIn: '5h' }); }

export function verifyToken(token) { return verify(token, process.env.JWT_KEY); }
