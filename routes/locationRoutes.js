const express = require("express");
const {
  getAllLocations,
  createLocation,
  getLocation,
  updateLocation,
} = require("../controllers/locationController");

const router = express.Router();

router.route("/").get(getAllLocations).post(createLocation);
router.route("/:id").get(getLocation).patch(updateLocation);

module.exports = router;
