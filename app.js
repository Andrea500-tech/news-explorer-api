const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const { errors } = require("celebrate");

const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./middlewares/rateLimiter");

// ✅ Import centralized config
const { PORT, MONGODB_URI } = require("./utils/config");

const app = express();

// Apply security and performance middleware
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());

// Request logger (must be before routes)
app.use(requestLogger);

// Crash test route (optional for grading/testing)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Connect central router
app.use(routes);

// Error logger (must be after routes and before celebrate/error handlers)
app.use(errorLogger);

// Celebrate validation error handler
app.use(errors());

// Centralized error handling middleware
app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
