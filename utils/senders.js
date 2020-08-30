exports.sendSuccess = (res, status, data) => {
  if (data) {
    return res.status(status).json({
      data,
    });
  }
  return res.status(status).send('Success');
};

exports.sendError = (res, status, error) => res.status(status).json({
  error,
});
