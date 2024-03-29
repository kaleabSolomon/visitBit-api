const express = require("express");
const {
  getRestrooms,
  getRestroom,
  createRestrooms,
  updateRestroom,
  deleteRestroom,
} = require("../controllers/restroomController");

const router = express.Router();

router.route("/").get(getRestrooms).post(createRestrooms);
router
  .route("/:id")
  .get(getRestroom)
  .patch(updateRestroom)
  .delete(deleteRestroom);

module.exports = router;
