const express = require("express");
const {
  getAllLocations,
  createLocation,
} = require("../controllers/locationController");

const router = express.Router();

router.route("/").get(getAllLocations).post(createLocation);
router.route("/:id").get(getLocation);

module.exports = router;
