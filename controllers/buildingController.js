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
  const building = await Building.findById(req.params.id);
  if (!building) {
    res.status(404);
    throw new AppError("building not found");
  }

  try {
    res.status(200).json({
      status: "success",
      data: { building },
    });
  } catch (err) {
    res.status(400);
    throw new AppError("unable to fetch building");
  }
});
exports.createBuilding = asyncHandler(async (req, res) => {
  const missingFields = [];
  const { name, coordinates, description, category, imageCover } = req.body;

  if (!name) missingFields.push("name");
  if (!coordinates) missingFields.push("coordinates");
  if (!description) missingFields.push("description");
  if (!category) missingFields.push("category");
  if (!imageCover) missingFields.push("cover image");

  if (missingFields.length > 0) {
    res.status(400);
    throw new AppError(`missing fields: ${missingFields.join(",")}`);
  }
  try {
    const building = await Building.create({
      name,
      coordinates,
      description: req.body.description,
      relativeLocation: req.body.relativeLocation,
      category,
      imageCover,
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
    throw new AppError("Unable to create Building");
  }
});

exports.updateBuilding = asyncHandler(async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (!building) {
    res.status(404);
    throw new AppError("building not found");
  }
  try {
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
  const building = await Building.findById(req.params.id);

  if (!building) {
    res.json(new AppError("Building not found", 404));
  }
  try {
    await Building.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: "success", data: null });
  } catch {
    res.status(400);
    throw new AppError("Unable to delete building");
  }
});
