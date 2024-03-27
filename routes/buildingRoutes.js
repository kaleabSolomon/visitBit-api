const express = require("express");
const {
  getAllBuildings,
  createBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding,
} = require("../controllers/buildingController");

const router = express.Router();

router.route("/").get(getAllBuildings).post(createBuilding);
router
  .route("/:id")
  .get(getBuilding)
  .patch(updateBuilding)
  .delete(deleteBuilding);

module.exports = router;
