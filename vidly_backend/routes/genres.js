const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genres");
const auth = require("../Middleware/auth");
const admin = require("../Middleware/admin");
const validateObjectId = require("../Middleware/validateObjectId");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) return res.status(404).send("Course not found");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Course not found");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genres = await Genre.findById(req.params.id);
  if (!genres) return res.status(404).send("Genre not found");

  res.send(genres);
});

module.exports = router;
