# Movies Library Backend

This repository contains the backend for the Movies Library application, built with NestJS.

## Table of Contents

- [Movies Library Backend](#movies-library-backend)

  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
    - [Environment Variables](#environment-variables)
  - [API Endpoints](#api-endpoints)
  - [Technologies Used](#technologies-used)

  ## Features

- User Authentication (Sign up, Login, Logout)
- CRUD operations for movie lists
- Public and private movie lists
- Search functionality for movies

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn
- A running MongoDB instance

### Installation

#### To test locally -
1. Clone the repository:

```bash
$ git clone https://github.com/niketjain1/movies_library_backend.git
cd movies_library_backend
```

2. Install dependencies:

```bash
$ npm install
```

3. Set up environment variables

Create a .env file in the root directory of the project and add the following environment variables:

```env

JWT_SECRET=jwt_secret
JWT_EXPIRES=3d
OMDB_API_KEY=API_key_from_the_omdb
DB_HOST=your_local_host_address
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
FRONTEND_URL=client_url_to_enable_cors
```

4. Start the server:

```bash
$ npm run start:dev
```

#### To test on prod -
```bash
hosted link = https://movies-library-backend-l2x6.onrender.com
```
### API Endpoints

Here are the main API endpoints for the Movies Library Backend:

- Auth

  - POST /auth/signup - Register a new user
  - POST /auth/login - Login a user

- Movies

  - POST /movies/search - Search a movie by title

- Movie Lists

- POST /list/create - Create a list
- POST /list/:id/movies - Add movies to the list
- GET /list/:userId/user - Fetch all the movies by the user
- GET /list/:listId- Fetch list by listId
- GET /list - Fetch all lists

### Technologies Used

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript
- [MongoDB](https://www.mongodb.com/) - A NoSQL database
- [Mongoose](https://mongoosejs.com/) - An ODM for MongoDB
- [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js
