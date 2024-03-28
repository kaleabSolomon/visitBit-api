const express = require("express");

const {
  getWifiSpots,
  createWifiSpots,
} = require("../controllers/wifiSpotController");
const router = express.Router();

router.route("/").get(getWifiSpots).post(createWifiSpots);

module.exports = router;
