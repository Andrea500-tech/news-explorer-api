# News Explorer API

A robust, production-ready RESTful backend API built for the **News Explorer** application. This API handles user registration, secure authentication via JWT, user profile management, and saving/deleting news articles with MongoDB persistence.

---

## Key Features

- **User Authentication & Authorization:** Secure signup and signin workflow using JSON Web Tokens (JWT) and `bcryptjs` password hashing.
- **Article Management:** Allows authorized users to save articles, view their saved bookmarks, and delete only the articles they own.
- **Request Validation:** Incoming payloads are rigorously checked using `Celebrate` and `Joi` before reaching controllers.
- **Security & Performance Middleware:** Protected by `Helmet` for secure HTTP headers, `CORS` for cross-origin sharing, and `express-rate-limit` to prevent abuse.
- **Logging System:** Tracks all incoming traffic (`request.log`) and server-side errors (`error.log`) using `Winston` and `Express-Winston`.
- **Centralized Error Handling:** Standardized custom error classes and a centralized error-handling middleware for consistent API responses.

---

## Technologies Used

- **Node.js & Express.js** – Server framework and routing architecture
- **MongoDB & Mongoose** – NoSQL database and object data modeling
- **JWT & bcryptjs** – Token-based authentication and secure password hashing
- **Celebrate & Joi** – Request data validation middleware
- **Winston & Express-Winston** – Comprehensive request and error logging
- **Helmet & Express Rate Limit** – Security hardening and traffic restriction

---

## Getting Started & Installation

### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/Andrea500-tech/news-explorer-api.git](https://github.com/Andrea500-tech/news-explorer-api.git)
cd news-explorer-api