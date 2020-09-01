exports.sendSuccess = (res, status, data) => {
  if (data) {
    return res.status(status).json({
      data,
    });
  }
  return res.status(status).send({ message: 'Success' });
};

exports.sendError = (res, status, error) => res.status(status).json({
  error,
});
