const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isGold: { type: Boolean },
  phone: { type: Number, required: true },
});

const Customer = mongoose.model("customer", customerSchema);

function validateCustomers(req) {
  const schema = {
    name: Joi.string().required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().required(),
  };
  return Joi.validate(req, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomers;
