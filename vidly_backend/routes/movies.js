const express = require("express");
const router = express.Router();
const { Movies, validate } = require("../models/movie");
const { Genre } = require("../models/genres");
const auth = require("../Middleware/auth");

router.get("/", async (req, res) => {
  const movie = await Movies.find().sort("title");
  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Genre not found");

  const movie = new Movies({
    title: req.body.title,
    genre: {
      _id: req.genre._id,
      name: req.genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    {
      new: true,
    }
  );
  if (!movie) return res.status(404).send("Movies not found");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movies.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send("Movies not found");

  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movies.findById(req.params.id);
  if (!movie) return res.status(404).send("Movies not found");

  res.send(movie);
});

module.exports = router;
