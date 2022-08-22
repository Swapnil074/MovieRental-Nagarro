const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Number,
        required: true,
      },
    }),
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rentals = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.ObjectId().required(),
    movieId: Joi.ObjectId().required(),
  };
  return Joi.validate(rental, schema);
}

exports.Rentals = Rentals;
exports.validate = validateRental;
