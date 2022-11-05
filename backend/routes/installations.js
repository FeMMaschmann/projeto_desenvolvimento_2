const express = require("express");
const router = express.Router();

const installations = require("../controllers/installations");

router.get("/:id", installations.getByUserId);
router.post("/", installations.insert);

module.exports = router;
