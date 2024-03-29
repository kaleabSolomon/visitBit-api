const mongoose = require("mongoose");

const waterSpotSchema = new mongoose.Schema({
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
  isDrinkable: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
waterSpotSchema.pre("save", async function (next) {
  this.name = "WaterSpot";
  next();
});
const WaterSpot = mongoose.model("WaterSpot", waterSpotSchema);

module.exports = WaterSpot;
