# Authentication Service

This is a simple authentication service built with Node.js, Express, bcrypt, and JSON Web Tokens (JWT).

## Features

- User signup: Allows users to register by providing a username and password.
- User login: Validates user credentials and issues a JWT token upon successful authentication.

## Setup

```bash
cd authentication-service
npm install
```

enter env as shown in

```bash
.env.example
```

## Start the server:

```bash
 npm run start_ts_dev
```

The server will start running on port 3000 by default.
Endpoints
POST /auth/signup

Registers a new user with the provided username and password.

Request body:

```json

{
"username": "your_username",
"password": "your_password"
}

Response:

    201 Created: User created successfully.
    400 Bad Request: If the username is already taken or other validation errors occur.
    500 Internal Server Error: If a server error occurs.

POST /auth/login

Logs in a user with the provided username and password.

Request body:

json

{
"username": "your_username",
"password": "your_password"
}

Response:

    200 OK: If the login is successful, returns a JWT token.
    401 Unauthorized: If the username or password is incorrect.
    404 Not Found: If the user does not exist.
    500 Internal Server Error: If a server error occurs.

POST /testing_route

Testing route to verify a JWT token.

Request body:

json

{
"token": "your_jwt_token"
}

Response:

    201 Created: If the token is valid, returns the decoded token payload.
    400 Bad Request: If the token is invalid or expired.

Dependencies

    express: "^4.17.1"
    bcrypt: "^5.0.1"
    jsonwebtoken: "^8.5.1"
    body-parser: "^1.19.0"
```
