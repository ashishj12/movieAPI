const express = require("express");
const Router = express.Router();
const movie_controller = require("../controllers/movie_controller");

Router.get("/movies",movie_controller.movieValidationRules(),movie_controller.getMovie);
Router.get("/movies/:id", movie_controller.getMovieById);
Router.post("/movies",movie_controller.upload.single("poster"),movie_controller.movieValidationRules(),movie_controller.validate,movie_controller.postMovie);
Router.put("/movies/:id", movie_controller.movieValidationRules(),movie_controller.validate,movie_controller.putMovieById);
Router.delete("/movies/:id", movie_controller.deleteMovieById);

module.exports = Router
