const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.post("/new", users.insert);
router.post("/login", users.login);
router.post("/test", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

module.exports = router;
