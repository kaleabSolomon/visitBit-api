const express = require("express");
const { search } = require("../controllers/searchController");

const router = express.Router();

router.route("/").get(search);

module.exports = router;
