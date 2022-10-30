const express = require("express");
const router = express.Router();

const locations = require("../controllers/locations");

router.get("/", locations.getLocations);
router.get("/:id", locations.getAdressByUserId);

module.exports = router;
