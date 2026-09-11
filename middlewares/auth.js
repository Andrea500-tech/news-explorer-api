const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config"); //  centralized config

const handleAuthError = (next) => {
  next(new UnauthorizedError("Authorization required"));
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(next);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; //  attach decoded payload to request
    return next();
  } catch {
    return handleAuthError(next);
  }
};
