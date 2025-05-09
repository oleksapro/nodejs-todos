# Node.js Basics Exploration: A Hands-On API Project

This repository contains a hands-on project built primarily to explore the fundamentals of Node.js. Avoiding common frameworks, it leverages native Node.js APIs like `createServer` to construct a RESTful API.

The project implements core functionalities including user authentication and task management, demonstrating practical application of various essential Node.js libraries:

- **Database:** SQLite (`sqlite3`) is used for data persistence, providing a simple and file-based database solution.
- **Configuration:** Environment variables are managed using `dotenv` for secure and flexible configuration.
- **User Authentication:** JSON Web Tokens (`jsonwebtoken`) are employed for secure user authentication, with `bcrypt` used for password hashing.
- **Logging:** `pino` is integrated for structured and efficient logging of application events.
- **Validation:** `zod` is used to provide TypeScript-first schema declaration and validation.
- **API Exploration:** Swagger UI (`swagger-ui-dist`) is included to provide an interactive API playground for easy testing and documentation.
- **Testing:** `supertest` and `jest` empowered tests.

The codebase follows a layered architecture, separating concerns into distinct directories:

- **Controllers:** Handle incoming HTTP requests and orchestrate the application logic.
- **Middlewares:** Implement cross-cutting concerns like authentication and request processing.
- **Repositories:** Abstract data access logic for interacting with the SQLite database.
- **Routes:** Define the API endpoints and map them to controller actions.
- **Services:** Contain business logic and orchestrate interactions between repositories and other layers.
- **Utils:** Provide utility functions for various tasks.
- **Entities:** Define the data structures used throughout the application.
- **Schemas:** Define the validation schemas.

The API exposes three main resource groups:

- **SharedTask:** Represents tasks that can be shared between users.
- **Task:** Manages individual tasks, allowing users to create, read, update, and delete their own tasks.
- **Users:** Handles user registration and authentication.

This application includes a Dockerfile for containerization, allowing for easy setup and execution within a Docker environment.

This project serves as a practical learning exercise, showcasing how to build a functional API using core Node.js features and a selection of fundamental libraries, while adhering to a well-organized architectural pattern.

The project intentionally utilizes the **callback** pattern for asynchronous operations to gain a fundamental understanding of Node.js's non-blocking nature. By directly engaging with callbacks, we aim to appreciate the core mechanisms of asynchronous JavaScript. This hands-on approach provides a deeper insight into the challenges and evolution of asynchronous programming in Node.js.

## Getting started

### Local

```bash
npm install

npm run watch
```

### Docker

```bash
docker build -t nodejs-todos .

docker run -p 3000:3000 nodejs-todos:latest
```

After server started open [/swagger-ui ](http://localhost:3000/swagger-ui)

## Todo

- Add pipeline with type checking and test running
