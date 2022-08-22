const express = require("express");
const router = express.Router();
const { Rentals, validate } = require("../models/rentals");
const { Customer } = require("../models/customer");
const { Movies } = require("../models/movie");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const auth = require("../Middleware/auth");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rental = await Rentals.find().sort("-dateOut");
  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Customer not found");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Movie not found");

  if (movie.numberInStock === 0) return res.status(400).send("Out of Stock");

  let rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(result.error.details[0].message);

//   const rental = await Rentals.findByIdAndUpdate(
//     req.params.id,
//     { title: req.body.title },
//     {
//       new: true,
//     }
//   );
//   if (!rental) return res.status(404).send("Rentals not found");

//   res.send(rental);
// });

// router.delete("/:id", async (req, res) => {
//   const rental = await Rentals.findByIdAndDelete(req.params.id);
//   if (!rental) return res.status(404).send("Rentals not found");

//   res.send(rental);
// });

router.get("/:id", async (req, res) => {
  const rental = await Movies.findById(req.params.id);
  if (!rental) return res.status(404).send("Movies not found");

  res.send(rental);
});

module.exports = router;
