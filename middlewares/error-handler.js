const errorHandler = (err, req, res, next) => {
  // If the error has a statusCode, use it; otherwise default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // If it's a 500 error, provide a generic message to hide server implementation details
  const message =
    statusCode === 500 ? "An internal server error occurred" : err.message;

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
