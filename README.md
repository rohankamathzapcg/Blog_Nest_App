# ClodeBlog Application

ClodeBlog is a full-stack web application for managing blog posts with categories. It provides CRUD operations for both categories and blog posts, image uploading capabilities, and implements JWT authentication and authorization for secure access.

## Technologies Used

- Frontend: React JS
- Backend: .NET Core Web API
- Database: PostgreSQL

## Features

### CRUD Operations

#### Categories
- Create a new category
- Read/view existing categories
- Update existing categories
- Delete existing categories

#### Blog Posts
- Create a new blog post
- Read/view existing blog posts
- Update existing blog posts
- Delete existing blog posts

### Image Upload

- Upload images for blog posts and store them in the database

### Authentication and Authorization

- JWT (JSON Web Tokens) authentication mechanism
- Authorization for accessing specific endpoints based on user roles

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- .NET Core SDK installed
- PostgreSQL installed and running

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Update the API base URL in the `.env` file if necessary.
4. Run `npm start` to start the frontend server.

### Backend Setup

1. Navigate to the `backend` directory.
2. Update the database connection string in `appsettings.json`.
3. Run `dotnet ef database update` to apply migrations and create the database schema.
4. Run `dotnet run` to start the backend server.

### Database Setup

1. Ensure PostgreSQL is running.
2. Create a new database for the application.
3. Update the connection string in the backend configuration files.

### JWT Configuration

1. Configure JWT settings in the backend application for authentication and authorization.
2. Generate secret keys for signing JWT tokens.

## API Documentation

- API documentation can be found in the backend codebase, typically in the form of Swagger UI or Postman collections.
