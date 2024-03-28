const express = require("express");

const {
  getWifiSpots,
  createWifiSpots,
  getWifiSpot,
} = require("../controllers/wifiSpotController");
const router = express.Router();

router.route("/").get(getWifiSpots).post(createWifiSpots);
router.route("/:id").get(getWifiSpot);

module.exports = router;
