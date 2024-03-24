const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Location should have a name"],
    trim: true,
    minLength: [3, "A Location cannot have less than 3 characters"],
    maxLength: [20, "A Location cannot have more than 20 characters"],
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
  category: {
    required: true,
    type: String,
    enum: {
      values: [
        "Wifi",
        "Toilet",
        "Office",
        "Lounge",
        "Class",
        "Cafe",
        "Dorm",
        "Library",
        "Games",
        "Hall",
        "Other",
      ],
      message: "Invalid Category",
    },

    imageCover: {
      type: String,
      required: [true, "A location Should have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
