const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("genre", genreSchema);

function validateGenres(req) {
  const schema = {
    name: Joi.string().required().min(5),
  };
  return Joi.validate(req, schema);
}

exports.Genre = Genre;
exports.validate = validateGenres;
exports.schema = genreSchema;
