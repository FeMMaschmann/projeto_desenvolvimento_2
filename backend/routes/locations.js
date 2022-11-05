const express = require("express");
const router = express.Router();

const locations = require("../controllers/locations");

router.get("/", locations.getLocations);
router.get("/:id", locations.getAdressByUserId);
router.put("/:id", locations.updateAdressByUserId);

module.exports = router;
