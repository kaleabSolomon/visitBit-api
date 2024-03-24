const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

exports.getAllLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await Location.find();

    res.status(200).json({
      status: "success",
      results: locations.length,
      data: {
        locations,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to get all locations",
      error: err.message,
    });
  }
});
exports.createLocation = asyncHandler(async (req, res) => {
  try {
    const location = await Location.create({
      name: req.body.name,
      coordinates: req.body.coordinates,
      description: req.body.description,
      category: req.body.category,
      imageCover: req.body.imageCover,
      images: req.body.images,
    });
    res.status(201).json({
      status: "successs",
      data: {
        location,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "Failed to create location",
      error: err.message,
    });
  }
});
