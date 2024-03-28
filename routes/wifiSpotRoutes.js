const express = require("express");

const {
  getWifiSpots,
  createWifiSpots,
  getWifiSpot,
  updateWifiSpot,
  deleteWifiSpot,
} = require("../controllers/wifiSpotController");
const router = express.Router();

router.route("/").get(getWifiSpots).post(createWifiSpots);
router
  .route("/:id")
  .get(getWifiSpot)
  .patch(updateWifiSpot)
  .delete(deleteWifiSpot);

module.exports = router;
