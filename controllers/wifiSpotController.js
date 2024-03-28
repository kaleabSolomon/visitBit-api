const asyncHandler = require("express-async-handler");
const WifiSpot = require("../models/wifiSpotModel");
const AppError = require("../utils/AppError");
exports.getWifiSpots = asyncHandler(async (req, res) => {
  try {
    const wifiSpots = await WifiSpot.find();

    res.status(200).json({
      status: "success",
      results: wifiSpots.length,
      data: {
        wifiSpots,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Failed to get wifi spots");
  }
});

exports.getWifiSpot = asyncHandler(async (req, res) => {
  const wifiSpot = await WifiSpot.findById(req.params.id);

  if (!wifiSpot) {
    throw new AppError("WifiSpot not found");
  }

  try {
    res.status(200).json({
      status: "success",
      data: {
        wifiSpot,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to fetch WifiSpot");
  }
});

exports.createWifiSpots = asyncHandler(async (req, res) => {
  if (!req.body.coordinates) {
    res.status(400);
    throw new AppError("Absolute location is mandatory");
  }
  try {
    const wifiSpot = await WifiSpot.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        wifiSpot,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to create the location");
  }
});

exports.updateWifiSpot = asyncHandler(async (req, res) => {
  const wifiSpot = await WifiSpot.findById(req.params.id);

  if (!wifiSpot) {
    res.status(404);
    throw new AppError("Wifi spot not found");
  }
  try {
    const updatedWifiSpot = await WifiSpot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ status: "success", data: { updatedWifiSpot } });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to update WifiSpot");
  }
});

exports.deleteWifiSpot = asyncHandler(async (req, res) => {
  const WifiSpot = await WifiSpot.findById(req.params.id);

  if (!wifiSpot) {
    res.json(new AppError("Wifi spot not found", 404));
  }
  try {
    await wifiSpot.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: "success", data: null });
  } catch {
    res.status(400);
    throw new AppError("Unable to delete the wifi spot");
  }
});
