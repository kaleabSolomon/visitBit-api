const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");
const AppError = require("../utils/AppError");

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

exports.getLocation = asyncHandler(async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      res.status(404).json(new AppError("location not found"));
    }

    res.status(200).json({
      status: "success",
      data: { location },
    });
  } catch (err) {
    res.status(400).json(AppError("Unable to create the Location", 400));
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
    res.status(400).json(new AppError("Unable to create the Location", 400));
  }
});

exports.updateLocation = asyncHandler(async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      res.status(404).json(new AppError("location not found"));
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ status: "success", data: { updatedLocation } });
  } catch (err) {
    res.status(400).json(new AppError("Unable to Update the Location", 400));
  }
});

exports.deleteLocation = asyncHandler(async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      res.json(new AppError("Location not found", 404));
    }

    await Location.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: "success", data: null });
  } catch {
    res.status(400).json(new AppError("Unable to delete the Location", 400));
  }
});
