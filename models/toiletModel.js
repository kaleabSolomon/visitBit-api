const mongoose = require("mongoose");

const toiletSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },

  relativeLocation: {
    type: String,
    maxLength: [
      100,
      "A relative location cannot have more than 100 characters",
    ],
  },
  gender: {
    type: String,
    required: [true, "Specify one of Male, Female or Unisex"],
    enum: ["male", "female", "unisex"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Toilet = mongoose.model("Toilet", toiletSchema);

module.exports = Toilet;
