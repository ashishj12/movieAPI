const { Movie } = require("../models/movie");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//validation rules for create an movie
const movieValidationRules = () => [
  body("title").isString().withMessage("title is required"),
  body("year").isNumeric().withMessage("year is required"),
  body("genre").isString().withMessage("genre is required"),
  body("rating").isFloat().withMessage("rating is required"),
  body("duration").isNumeric().withMessage("duration is required"),
];

//check for errors in validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//get movie with pagination in movies
async function getMovie(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const movies = await Movie.find().skip(skip).limit(limit);
    const total = await Movie.countDocuments();

//create an object to store poster url with filename
    const moviesWithPosterUrl = [];
    for (const movie of movies) {
      moviesWithPosterUrl.push({
        ...movie.toObject(),
        posterUrl: movie.poster ? `/uploads/${movie.poster.filename}` : null,
      });
    }
    res.json({
      movies: moviesWithPosterUrl,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });
  } catch (error) {
    res.json({ error: "Error fetching movies" });
  }
}

//get an movie using movie id

async function getMovieById(req, res) {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json("Movie not found");
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.json({ error: "Error fetching movie" });
  }
}

//create movie
async function postMovie(req, res) {
  console.log("Request Body:", req.body);
  console.log("File:", req.file);
  try {
    const { title, year, genre, rating, duration } = req.body;
    const movie = new Movie({
      title,
      year,
      genre,
      rating,
      duration,
      poster: req.file
        ? {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
          }
        : undefined,
    });
    const result = await movie.save();
    res.status(201).json("Movie created");
  } catch (error) {
    res.status(500).json({ error: "Error creating movie" });
  }
}

//update movie
async function putMovieById(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Movie.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      res.status(404).json("Movie not found");
    } else {
      res.json("Movie updated");
    }
  } catch (error) {
    res.json({ error: "Error updating movie" });
  }
}

//delete movie by id
async function deleteMovieById(req, res) {
  try {
    const id = req.params.id;
    const result = await Movie.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json("Movie not found");
    } else {
      res.status(204).json("Movie Deleted");
    }
  } catch (error) {
    res.json({ error: "Error deleting movie" });
  }
}

module.exports = {
  getMovie,
  getMovieById,
  postMovie,
  putMovieById,
  deleteMovieById,
  movieValidationRules,
  validate,
  upload,
};
