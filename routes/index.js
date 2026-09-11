const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { NotFoundError } = require("../utils/errors");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

// Public routes with validation
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

// Global auth gatekeeper for everything below
router.use(auth);

// Protected routes
router.use("/users", userRouter);
router.use("/articles", articleRouter);

// Catch-all for undefined routes
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
