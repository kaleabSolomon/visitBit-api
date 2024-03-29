const express = require("express");
const {
  getWaterSpots,
  getWaterSpot,
  createWaterSpots,
  updateWaterSpot,
  deleteWaterSpot,
} = require("../controllers/waterSpotController");

const router = express.Router();

router.route("/").get(getWaterSpots).post(createWaterSpots);
router
  .route("/:id")
  .get(getWaterSpot)
  .patch(updateWaterSpot)
  .delete(deleteWaterSpot);

module.exports = router;
