const { verifyToken } = require('../helpers/auth');
const { sendError } = require('../helpers/senders');

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) sendError(res, 401, 'Please log in first');
  else {
    const decoded = verifyToken(authorization.split(' ')[1]);
    if (!decoded) sendError(res, 401, 'Invalid token');
    else {
      req.payload = decoded;
      next();
    }
  }
};
