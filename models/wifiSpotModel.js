const mongoose = require("mongoose");

const wifiSpotSchema = new mongoose.Schema({
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
  imageCover: {
    type: String,
    required: [true, "A Wifi Spot Should have a cover image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const WifiSpot = mongoose.model("WifiSpot", wifiSpotSchema);

module.exports = WifiSpot;
