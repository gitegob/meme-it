const jwt = require('jsonwebtoken');

exports.generateToken = ({
  _id, userName,
}) => jwt.sign({ _id, userName }, process.env.JWT_KEY, { expiresIn: '5h' });

exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);
