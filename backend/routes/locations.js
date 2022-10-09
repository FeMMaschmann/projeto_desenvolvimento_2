const express = require("express");
const router = express.Router();

const locations = require("../controllers/locations");

router.get("/", locations.getLocations);

module.exports = router;
