const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

exports.getAllLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find();

  res.status(200).json({
    status: "success",
    results: location.length,
    data: {
      locations,
    },
  });
});
exports.createLocation = asyncHandler(async (req, res) => {
  console.log(req.body.name);
  try {
    const location = await Location.create({
      name: req.body.name,
      coordinates: req.body.coordinates,
      description: req.body.description,
      category: req.body.category,
      imageCover: req.body.imageCover,
      images: req.body.images,
    });
    console.log("creating this shit");
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
