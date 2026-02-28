# Production Backend Task Management API

A production-style REST API built using Node.js, Express.js and MongoDB following MVC architecture.

## 🚀 Features

- User Registration & Login
- JWT Authentication (httpOnly Cookies)
- Role-Based Authorization
- Task CRUD Operations
- Ownership Enforcement
- Pagination (page & limit)
- Centralized Error Handling
- Rate Limiting (Login Protection)

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- MVC Architecture

## 📂 Architecture

- Models → Data layer
- Controllers → Business logic
- Routes → API endpoints
- Middleware → Authentication, Authorization, Errors

## ⚙️ Run Locally

1. Install dependencies  
   npm install  

2. Create .env file and add:
   MONGO_URI=your_mongo_connection_string  
   JWT_SECRET=your_secret  

3. Start server  
   npm run dev  

## 🧠 Future Improvements

- Refresh Tokens
- Input Validation
- Caching
- Logging
- Swagger Documentation