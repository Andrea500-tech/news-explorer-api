// utils/config.js
const {
  PORT = 3001, // default port
  JWT_SECRET = "dev-secret-key", // default JWT secret
  MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer-db", // default DB URI
} = process.env;

module.exports = { PORT, JWT_SECRET, MONGODB_URI };
