# AI Web Scrapping

## Overview

The **ai-web-scrapping** project is an advanced web scraping application integrated with artificial intelligence capabilities. The primary purpose of this app is to intelligently collect data about a specified piece of information from various online sources. The application utilizes AI algorithms to enhance the efficiency and accuracy of the web scraping process.

## Features

- **AI Integration:** Leverage the power of artificial intelligence to intelligently extract relevant data.
- **Web Scraping:** Collect information from websites based on user-defined parameters.

- **Security:** Implement security measures such as encryption and authentication to ensure data integrity.

## Getting Started

Follow these steps to set up and run the project locally:

1. **Installation:**

   ```bash
   npm install
   ```

2. **Development Server:**

   ```bash
   npm run dev
   ```

3. **Production Build:**

   ```bash
   npm run build
   npm run start:prod
   ```

## Scripts:

```bash
lint: Run ESLint to ensure code quality.

dev: Start the development server using Nodemon for automatic restarts.

start: Start the server using ts-node for easy TypeScript execution.

start:prod: Build the project and run the production server.

build: Compile TypeScript code into JavaScript.
```

## Dependencies

```bash
@prisma/client: 5.7.0
bcrypt: 5.1.1
cors: 2.8.5
dotenv: 16.3.1
express: 4.18.2
helmet: 7.1.0
jsonwebtoken: 9.0.2
langchain: 0.0.202
prisma: 5.7.0
serpapi: 2.0.0
zod: 3.22.4
```

## Development Dependencies

```bash
@types/bcrypt: 5.0.2
@types/cors: 2.8.17
@types/express: 4.17.21
@types/jsonwebtoken: 9.0.5
@types/node: 20.10.3
@typescript-eslint/eslint-plugin: 6.13.2
@typescript-eslint/parser: 6.13.2
eslint: 8.55.0
eslint-config-prettier: 9.1.0
eslint-plugin-prettier: 5.0.1
nodemon: 3.0.2
prettier: 3.1.0
ts-node: 10.9.1
typescript: 5.3.2
License
```

## Author

Claudio Cassimiro

## API Endpoints

### 1. Create Topic

- Endpoint:

  - POST `/api/topic`

- Description: Create a new topic with web scraping and AI integration.

- Endpoint:

  - POST `/api/getTopics`

- Description: Returns all topics and related data.

- Middleware:

  - `authenticateToken`: Ensures the request is authenticated.

- Controller:

  - `topicController.topic`: Handles the creation of a new topic.

### 2. Get Single User

- Endpoint:

  - GET `/api/:id`

- Description: Retrieve information about a single user.

- Middleware:

  - `authenticateToken`: Ensures the request is authenticated.

- Controller:

  - `getSingleUserController`: Retrieves information about a user.

### 3. Register User

- Endpoint:

  - POST `/api/register`

- Description: Register a new user.

- Controller:

  - `createUserController`: Handles user registration.

### 4. User Login

- Endpoint:

  - POST `/api/login`

- Description: Authenticate a user's login.

- Controller:

  - `authPasswordController`: Handles user authentication.

### 5. Update User Password

- Endpoint:

  - PUT `/api/:id`

- Description: Update the password of a user.

- Middleware:

  - `authenticateToken`: Ensures the request is authenticated.

- Controller:

  - `updateUserPasswordController`: Handles the update of a user's password.

### 6. Delete User

- Endpoint:

  - DELETE `/api/:id`

- Description: Delete a user account.

- Middleware:

  - `authenticateToken`: Ensures the request is authenticated.

- Controller:

  - `deleteUserController`: Handles the deletion of a user account.
