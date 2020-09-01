const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateToken = ({
  _id, userName,
}) => jwt.sign({ _id, userName }, process.env.JWT_KEY, { expiresIn: '5h' });

exports.verifyPwd = (password, hash) => {
  let match = false;
  bcrypt.compare(password, hash, (err, result) => {
    if (result) match = true;
    else match = false;
  });
  return match;
};

exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);
