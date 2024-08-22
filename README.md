# Movie API

This project is a Movie Database API with a frontend interface for managing and displaying movie information.

## Features

- RESTful API for CRUD operations on movies
- Frontend interface for viewing and adding movies
- Pagination support for movie listings
- Image upload for movie posters
- Form validation for movie data

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB 
- Multer for file uploads
- Express Validator for input validation

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

## API Endpoints

- GET `/api/movies`: Fetch movies with pagination
- GET `/api/movies/:id`: Fetch a specific movie by ID
- POST `/api/movies`: Create a new movie
- PUT `/api/movies/:id`: Update an existing movie
- DELETE `/api/movies/:id`: Delete a movie

## Setup and Installation

1. Clone the repository: Here's the complete README.md file for the project:
markdownCopy# Movie API

This project is a Movie Database API with a frontend interface for managing and displaying movie information.

## Features

- RESTful API for CRUD operations on movies
- Frontend interface for viewing and adding movies
- Pagination support for movie listings
- Image upload for movie posters
- Form validation for movie data

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (assumed, based on Mongoose-like syntax)
- Multer for file uploads
- Express Validator for input validation

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

## API Endpoints

- GET `/api/movies`: Fetch movies with pagination
- GET `/api/movies/:id`: Fetch a specific movie by ID
- POST `/api/movies`: Create a new movie
- PUT `/api/movies/:id`: Update an existing movie
- DELETE `/api/movies/:id`: Delete a movie

## Setup and Installation

1. Clone the repository:
git clone https://github.com/ashishj12/movieAPI.git

2. Install dependencies: npm install
3. Set up MongoDB:
- Install MongoDB on your system if you haven't already. You can download it from the [official MongoDB website](https://www.mongodb.com/try/download/community).
- Start the MongoDB service on your machine.
- Create a new database for this project. You can do this by opening a MongoDB shell and running:
  ```
  use movieDatabase
  ```
- Update the MongoDB connection string in your project. In your server file (likely `server.js` or `app.js`), find the line where you connect to MongoDB and update it with your database name:
  ```javascript
  mongoose.connect('mongodb://localhost/movieDatabase', {useNewUrlParser: true, useUnifiedTopology: true});
  ```

4. Start the server:node server.js
5. Open `index.html` in a web browser to access the frontend interface## Usage

- Use the "Get Movies" button to fetch and display movies
- Navigate through pages using the "Previous" and "Next" buttons
- Add new movies using the form provided

## Project Structure

- `server.js`: Main server file
- `routes/movie_routes.js`: API routes for movie operations
- `controllers/movie_controller.js`: Controller functions for movie operations
- `models/movie.js`: Movie model schema (assumed)
- `public/`: Static files for frontend
- `index.html`: Main HTML file
- `styles.css`: CSS styles
- `script.js`: Frontend JavaScript
- `uploads/`: Directory for storing uploaded movie posters

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/ashishj12/movieAPI/issues) if you want to contribute.
