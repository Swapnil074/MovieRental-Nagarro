const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");
  const token = user.generateAuthToken();
  res.send(token);
});

function validateUser(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
