const asyncHandler = require("express-async-handler");

exports.getWifiSpots = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

exports.createWifiSpots = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "creation success",
  });
});
