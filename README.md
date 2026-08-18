# WTWR Express API

WTWR Express API is the back-end server for the WTWR application. It handles user registration, login, authentication, profile updates, clothing item data, likes, and protected routes for the React frontend.

## Project Features

- Express server running on port 3001 locally
- MongoDB connection with Mongoose models
- User registration and login with hashed passwords
- JWT-based authorization
- Protected user and clothing item routes
- Clothing item creation, deletion, likes, and unlikes
- Centralized error handling with custom error classes
- Request validation with celebrate, Joi, and validator
- Request and error logging with winston and express-winston
- Environment variable support with dotenv
- Crash-test route for PM2 recovery testing during review

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- celebrate and Joi
- validator
- winston and express-winston
- dotenv
- ESLint and Prettier
- PM2, nginx, and SSL for deployment

## Running the Project Locally

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start
```

Start the server with hot reload:

```bash
npm run dev
```

The API runs locally at `http://localhost:3001`.

## API Routes

- `POST /signup` creates a user
- `POST /signin` logs in a user
- `GET /users/me` returns the current user
- `PATCH /users/me` updates the current user
- `GET /items` returns all clothing items
- `POST /items` creates a clothing item
- `DELETE /items/:itemId` deletes a clothing item
- `PUT /items/:itemId/likes` likes a clothing item
- `DELETE /items/:itemId/likes` unlikes a clothing item
- `GET /crash-test` intentionally crashes the server for PM2 recovery testing

## Deployment

- Deployed domain: `https://wtwr2026.ycare.org`
- Frontend repository: [se_project_react](https://github.com/jonn1193/se_project_react)
- Backend repository: [se_project_express](https://github.com/jonn1193/se_project_express)

## Project Pitch Video

Check out [this video](https://www.loom.com/share/148adc8ac3354e01a5f4a379b9a5b095), where I describe my project and some challenges I faced while building it.
