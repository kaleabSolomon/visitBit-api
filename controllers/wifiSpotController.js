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
  res.status(201).json({
    message: "creation success",
  });
});
