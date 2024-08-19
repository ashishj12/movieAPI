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
    data: Buffer,
    contentType: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
};
