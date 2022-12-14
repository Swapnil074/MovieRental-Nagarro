const express = require("express");
const customers = require("../routes/customers");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const returns = require("../routes/return");
const user = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../Middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/users", user);
  app.use("/api/customers", customers);
  app.use("/api/genres", genres);
  app.use("/api/rentals", rentals);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
  app.set();
};
