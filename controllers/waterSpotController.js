const asyncHandler = require("express-async-handler");
const WaterSpot = require("../models/waterSpotModel");
const AppError = require("../utils/AppError");
exports.getWaterSpots = asyncHandler(async (req, res) => {
  try {
    const waterSpots = await WaterSpot.find();

    res.status(200).json({
      status: "success",
      results: waterSpots.length,
      data: {
        waterSpots,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Failed to get waterSpots");
  }
});

exports.getWaterSpot = asyncHandler(async (req, res) => {
  const waterSpot = await WaterSpot.findById(req.params.id);

  if (!waterSpot) {
    throw new AppError("WaterSpot not found");
  }

  try {
    res.status(200).json({
      status: "success",
      data: {
        waterSpot,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to fetch WaterSpot");
  }
});

exports.createWaterSpots = asyncHandler(async (req, res) => {
  if (!req.body.coordinates) {
    res.status(400);
    throw new AppError("Absolute location is mandatory");
  }
  try {
    const waterSpot = await WaterSpot.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        waterSpot,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to create the location");
  }
});

exports.updateWaterSpot = asyncHandler(async (req, res) => {
  const waterSpot = await WaterSpot.findById(req.params.id);

  if (!waterSpot) {
    res.status(404);
    throw new AppError("WaterSpot not found");
  }
  try {
    const updatedWaterSpot = await WaterSpot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ status: "success", data: { updatedWaterSpot } });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to update WaterSpot");
  }
});

exports.deleteWaterSpot = asyncHandler(async (req, res) => {
  const waterSpot = await WaterSpot.findById(req.params.id);

  if (!waterSpot) {
    res.json(new AppError("WaterSpot not found", 404));
  }
  try {
    await WaterSpot.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch {
    res.status(400);
    throw new AppError("Unable to delete the waterSpot");
  }
});
