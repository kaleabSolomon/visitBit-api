const asyncHandler = require("express-async-handler");
const Building = require("../models/buildingModel");
const AppError = require("../utils/AppError");

exports.getAllBuildings = asyncHandler(async (req, res) => {
  try {
    const buildings = await Building.find();

    res.status(200).json({
      status: "success",
      results: buildings.length,
      data: {
        buildings,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Failed to get all buildings");
  }
});

exports.getBuilding = asyncHandler(async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
      res.status(404).json(new AppError("building not found"));
    }

    res.status(200).json({
      status: "success",
      data: { building },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Failed to get building");
  }
});
exports.createBuilding = asyncHandler(async (req, res) => {
  try {
    const building = await Building.create({
      name: req.body.name,
      coordinates: req.body.coordinates,
      description: req.body.description,
      category: req.body.category,
      imageCover: req.body.imageCover,
      images: req.body.images,
    });
    res.status(201).json({
      status: "success",
      data: {
        building,
      },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to create the Building");
  }
});

exports.updateBuilding = asyncHandler(async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      res.status(404).json(new AppError("building not found"));
    }

    const updatedBuilding = await Building.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ status: "success", data: { updatedBuilding } });
  } catch (err) {
    res.status(400);
    throw new AppError("Unable to update building");
  }
});

exports.deleteBuilding = asyncHandler(async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      res.json(new AppError("Building not found", 404));
    }

    await Building.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: "success", data: null });
  } catch {
    res.status(400);
    throw new AppError("Unable to delete building");
  }
});
