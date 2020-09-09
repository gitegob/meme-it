export function sendSuccess(res, status, data) {
  if (data) {
    return res.status(status).json({
      data,
    });
  }
  return res.status(status).send({ message: 'Success' });
}

export function sendError(res, status, error) {
  return res.status(status).json({
    error,
  });
}
