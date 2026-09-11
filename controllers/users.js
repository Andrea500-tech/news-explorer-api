const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config"); // centralized config

// Get current user info (/users/me)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .select("-password") //  explicitly exclude password for clarity
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send(user);
    })
    .catch(next);
};

// Create a new user (Signup)
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        email,
        password: hashedPassword,
      }),
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("A user with this email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

// Login user (Signin)
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET, //  consistent secret source
        { expiresIn: "7d" },
      );
      res.send({ token });
    })
    .catch(() => {
      //  don’t leak DB errors, only return generic Unauthorized
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
