const asyncHandler = require("express-async-handler");
const async = require("async");
const BuildingModel = require("../models/buildingModel");
const RestroomModel = require("../models/restroomModel");
const WaterSpotModel = require("../models/waterSpotModel");
const WifiSpotModel = require("../models/wifiSpotModel");

exports.search = asyncHandler(async (req, res) => {
  const { query } = req.query; // Get the search query from request parameters

  if (!query) {
    return res.status(400).json({ message: "Please provide a search query" });
  }

  try {
    let searchResults = await Promise.all([
      // Perform searches in parallel using async.parallel
      BuildingModel.find({ name: { $regex: new RegExp(query, "i") } }),
      RestroomModel.find({ name: { $regex: new RegExp(query, "i") } }),
      WaterSpotModel.find({ name: { $regex: new RegExp(query, "i") } }),
      WifiSpotModel.find({ name: { $regex: new RegExp(query, "i") } }),
    ]);
    console.log(searchResults);
    const flattenedResults = searchResults.flat(); // Combine results from all collections

    console.log(flattenedResults);

    res.status(200).json({ message: "Search results", data: flattenedResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during search" });
  }
});
