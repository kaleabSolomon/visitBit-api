const asyncHandler = require("express-async-handler");
const Restroom = require("../models/restroomModel");
const AppError = require("../utils/AppError");
exports.getRestrooms = asyncHandler(async (req, res) => {
  try {
    const restrooms = await Restroom.find();

    res.status(200).json({
      status: "success",
      results: restrooms.length,
      data: {
        restrooms,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Failed to get restrooms");
  }
});

exports.getRestroom = asyncHandler(async (req, res) => {
  const restroom = await Restroom.findById(req.params.id);

  if (!restroom) {
    throw new AppError("Restroom not found");
  }

  try {
    res.status(200).json({
      status: "success",
      data: {
        restroom,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to fetch Restroom");
  }
});

exports.createRestrooms = asyncHandler(async (req, res) => {
  if (!req.body.coordinates) {
    res.status(400);
    throw new AppError("Absolute location is mandatory");
  }
  try {
    const restroom = await Restroom.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        restroom,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to create the location");
  }
});

exports.updateRestroom = asyncHandler(async (req, res) => {
  const restroom = await Restroom.findById(req.params.id);

  if (!restroom) {
    res.status(404);
    throw new AppError("Restroom not found");
  }
  try {
    const updatedRestroom = await Restroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ status: "success", data: { updatedRestroom } });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to update Restroom");
  }
});

exports.deleteRestroom = asyncHandler(async (req, res) => {
  const restroom = await Restroom.findById(req.params.id);

  if (!restroom) {
    res.json(new AppError("Restroom not found", 404));
  }
  try {
    await Restroom.findByIdAndDelete(req.params.id);
    res.status(204);
  } catch {
    res.status(400);
    throw new AppError("Unable to delete the restroom");
  }
});
