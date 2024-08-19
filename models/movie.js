const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/movieData";

mongoose.connect(connectionString);

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genre: String,
  rating: Number,
  duration: Number,
  poster: {
    fieldname: String,
    originalname: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
};
