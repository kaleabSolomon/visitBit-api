const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Building should have a name"],
    trim: true,
    minLength: [3, "A Building cannot have less than 3 characters"],
    maxLength: [20, "A Building cannot have more than 20 characters"],
  },
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

  description: {
    type: String,
    maxLength: [100, "A description cannot have more than 100 characters"],
    required: true,
  },
  relativeLocation: {
    type: String,
    maxLength: [
      100,
      "A relative location cannot have more than 100 characters",
    ],
  },
  category: {
    required: true,
    type: String,
    enum: {
      values: [
        "Office",
        "Lounge",
        "Class",
        "Cafe",
        "Dorm",
        "Library",
        "Hall",
        "Others",
      ],
      message: "Invalid Category",
    },

    imageCover: {
      type: String,
      required: [true, "A building Should have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
});

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;
