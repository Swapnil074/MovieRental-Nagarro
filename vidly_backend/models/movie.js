const Joi = require("joi");
const mongoose = require("mongoose");
const { schema, Genre } = require("./genres");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: schema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});

const Movies = mongoose.model("Movies", movieSchema);

function validateMovies(req) {
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.ObjectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };
  return Joi.validate(req, schema);
}
exports.validate = validateMovies;
exports.schema = movieSchema;
exports.Movies = Movies;
